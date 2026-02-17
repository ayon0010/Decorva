import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

async function generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
    const baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (true) {
        const existing = await prisma.blogPost.findUnique({
            where: { slug },
        });

        if (!existing || (excludeId && existing.id === excludeId)) {
            return slug;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
    }
}

export async function POST(req: Request) {
    const session = await auth();
    const isAdmin = session?.user?.roles?.includes('ADMIN');
    if (!isAdmin) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { blogTitle, productDescriptionHtml, featuredImage, content, id } = await req.json();

        if (!blogTitle || !productDescriptionHtml) {
            return NextResponse.json(
                { success: false, message: 'Blog title and content are required' },
                { status: 400 }
            );
        }

        // Si un ID est fourni, mettre à jour le blog existant
        if (id) {
            const existingBlog = await prisma.blogPost.findUnique({
                where: { id },
            });

            if (!existingBlog) {
                return NextResponse.json(
                    { success: false, message: 'Blog not found' },
                    { status: 404 }
                );
            }

            // Générer un nouveau slug si le titre a changé
            let slug = existingBlog.slug;
            if (blogTitle !== existingBlog.title) {
                slug = await generateUniqueSlug(blogTitle, id);
            }

            const updatedBlog = await prisma.blogPost.update({
                where: { id },
                data: {
                    title: blogTitle,
                    slug,
                    contentHtml: productDescriptionHtml,
                    content: content || productDescriptionHtml,
                    ...(featuredImage && { featuredImage }),
                },
            });

            return NextResponse.json(
                { success: true, message: 'Blog updated successfully', blog: updatedBlog },
                { status: 200 }
            );
        }

        // Créer un nouveau blog
        const slug = await generateUniqueSlug(blogTitle);

        const blog = await prisma.blogPost.create({
            data: {
                title: blogTitle,
                slug,
                contentHtml: productDescriptionHtml,
                content: content || productDescriptionHtml,
                featuredImage: featuredImage || null,
            },
        });

        return NextResponse.json(
            { success: true, message: 'Blog published successfully', blog },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in POST /api/blog:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create/update blog' },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');
        const id = searchParams.get('id');
        const limit = searchParams.get('limit');
        const recent = searchParams.get('recent');

        // Récupérer un blog par ID
        if (id) {
            const blog = await prisma.blogPost.findUnique({
                where: { id },
            });

            if (!blog) {
                return NextResponse.json(
                    { success: false, message: 'Blog not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({ success: true, blog }, { status: 200 });
        }

        // Récupérer un blog par slug
        if (slug) {
            const blog = await prisma.blogPost.findUnique({
                where: { slug },
            });

            if (!blog) {
                return NextResponse.json(
                    { success: false, message: 'Blog not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({ success: true, blog }, { status: 200 });
        }

        // Récupérer les blogs récents
        if (recent) {
            const blogs = await prisma.blogPost.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                take: limit ? parseInt(limit) : 10,
            });

            return NextResponse.json({ success: true, blogs }, { status: 200 });
        }

        // Récupérer tous les blogs
        const blogs = await prisma.blogPost.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            ...(limit && { take: parseInt(limit) }),
        });

        return NextResponse.json({ success: true, blogs }, { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/blog:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to get blogs' },
            { status: 500 }
        );
    }
}