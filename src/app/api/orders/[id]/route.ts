import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole, PaymentStatus, OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const session = await auth();
        if (session?.user?.id !== id) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: id,
            },
            include: {
                items: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({
            success: true,
            orders,
        }, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}


export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { status, paymentStatus } = await request.json();
    try {
        const session = await auth();
        const isAdmin = session?.user?.roles.includes(UserRole.ADMIN);
        if (!isAdmin) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get current order to check payment status
        const currentOrder = await prisma.order.findUnique({
            where: { id },
            include: { items: true },
        });

        if (!currentOrder) {
            return NextResponse.json(
                { success: false, message: 'Order not found' },
                { status: 404 }
            );
        }

        const updateData: { status?: OrderStatus; paymentStatus?: PaymentStatus; paidAt?: Date } = {};
        if (status) updateData.status = status as OrderStatus;
        if (paymentStatus !== undefined) {
            updateData.paymentStatus = paymentStatus as PaymentStatus;
            if (paymentStatus === PaymentStatus.PAID && currentOrder.paymentStatus !== PaymentStatus.PAID) {
                updateData.paidAt = new Date();
            }
        }

        const order = await prisma.order.update({
            where: { id },
            data: updateData,
            include: { items: true },
        });

        // Update stock if payment status changed to PAID
        if (paymentStatus === PaymentStatus.PAID && currentOrder.paymentStatus !== PaymentStatus.PAID) {
            for (const orderItem of order.items) {
                try {
                    if (orderItem.variationId) {
                        // Update variation stock
                        const variation = await prisma.productVariation.findUnique({
                            where: { id: orderItem.variationId },
                        });
                        
                        if (variation && variation.manageStock && variation.stockQuantity != null) {
                            const newStock = Math.max(0, variation.stockQuantity - orderItem.quantity);
                            await prisma.productVariation.update({
                                where: { id: orderItem.variationId },
                                data: {
                                    stockQuantity: newStock,
                                    stockStatus: newStock === 0 ? 'OUTOFSTOCK' : 'INSTOCK',
                                },
                            });
                        }
                    } else {
                        // Update product stock
                        const product = await prisma.product.findUnique({
                            where: { id: orderItem.productId },
                        });
                        
                        if (product && product.manageStock && product.stockQuantity != null) {
                            const newStock = Math.max(0, product.stockQuantity - orderItem.quantity);
                            await prisma.product.update({
                                where: { id: orderItem.productId },
                                data: {
                                    stockQuantity: newStock,
                                    stockStatus: newStock === 0 ? 'OUTOFSTOCK' : 'INSTOCK',
                                },
                            });
                        }
                    }
                } catch (stockError) {
                    console.error(`Failed to update stock for order item ${orderItem.id}:`, stockError);
                    // Continue with other items even if one fails
                }
            }
        }

        return NextResponse.json({ success: true, order }, { status: 200 });
    } catch (error) {
        console.error('Failed to update order status:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update order status' },
            { status: 500 }
        );
    }
}