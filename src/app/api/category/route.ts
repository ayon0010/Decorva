import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await prisma.productCategory.findMany({
            where: {
                slug: {
                    not: "",
                }
            }
        });
        return NextResponse.json({ success: true, categories }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Failed to get categories' }, { status: 500 });
    }
}