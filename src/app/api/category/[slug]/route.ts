import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request,
    { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const category = await prisma.productCategory.findUnique({
            where: { slug },
            include: {
                products: {
                    include: {
                        images: true,
                    }
                },
            }
        });
        return NextResponse.json({ success: true, category }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Failed to get category' }, { status: 500 });
    }
}