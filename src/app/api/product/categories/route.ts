import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const session = await auth();
    const isAdmin = session?.user?.roles.includes('ADMIN');
    if (!isAdmin) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const slug: string = data?.name?.split(' ').join('-').toLowerCase();

    const existingCategory = await prisma.productCategory.findFirst({
        where: { slug }
    });

    if (existingCategory) {
        return NextResponse.json({ success: false, message: 'Category already exists' }, { status: 400 });
    }

    try {
        await prisma.productCategory.create({
            data: {
                name: data.name,
                slug: slug,
                parentId: data.parentId || null,
                description: data.description,
                imageUrl: data.imageUrl,
                count: data.count,
            }
        });
        return NextResponse.json({ success: true, message: 'Category created successfully' }, { status: 200 });
    } catch {
        return NextResponse.json({ success: false, message: 'An error occurred while creating category' }, { status: 500 });
    }
}


export async function GET() {
    const session = await auth();
    const isAdmin = session?.user?.roles.includes('ADMIN');
    if (!isAdmin) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    try {
        const categories = await prisma.productCategory.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                parentId: true,
                description: true,
                imageUrl: true,
                count: true,
                children: true
            }
        });
        return NextResponse.json({ success: true, data: categories }, { status: 200 });
    } catch {
        return NextResponse.json({ success: false, message: 'An error occurred while fetching categories' }, { status: 500 });
    }
}