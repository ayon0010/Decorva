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

async function generateUniqueSlug(title: string, excludeId: string): Promise<string> {
    const baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (true) {
        const existing = await prisma.blogPost.findUnique({
            where: { slug },
        });

        if (!existing || existing.id === excludeId) {
            return slug;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
    }
}

// GET - Récupérer un blog par ID
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

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
    } catch (error) {
        console.error('Error in GET /api/blog/[id]:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to get blog' },
            { status: 500 }
        );
    }
}

// PATCH - Mettre à jour un blog
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    const isAdmin = session?.user?.roles?.includes('ADMIN');
    if (!isAdmin) {
        return NextResponse.json(
            { success: false, message: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const { id } = await params;
        const data = await request.json();

        const existingBlog = await prisma.blogPost.findUnique({
            where: { id },
        });

        if (!existingBlog) {
            return NextResponse.json(
                { success: false, message: 'Blog not found' },
                { status: 404 }
            );
        }

        // Préparer les données de mise à jour
        const updateData: {
            title?: string;
            slug?: string;
            contentHtml?: string;
            content?: string;
            featuredImage?: string | null;
        } = {};

        // Mettre à jour le titre et le slug si nécessaire
        if (data.blogTitle || data.title) {
            const newTitle = data.blogTitle || data.title;
            updateData.title = newTitle;

            // Générer un nouveau slug si le titre a changé
            if (newTitle !== existingBlog.title) {
                updateData.slug = await generateUniqueSlug(newTitle, id);
            }
        }

        // Mettre à jour le contenu HTML
        if (data.productDescriptionHtml || data.contentHtml) {
            updateData.contentHtml = data.productDescriptionHtml || data.contentHtml;
        }

        // Mettre à jour le contenu texte
        if (data.content !== undefined) {
            updateData.content = data.content;
        }

        // Mettre à jour l'image featured
        if (data.featuredImage !== undefined) {
            updateData.featuredImage = data.featuredImage || null;
        }

        const updatedBlog = await prisma.blogPost.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(
            { success: true, message: 'Blog updated successfully', blog: updatedBlog },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in PATCH /api/blog/[id]:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update blog' },
            { status: 500 }
        );
    }
}

// DELETE - Supprimer un blog
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    const isAdmin = session?.user?.roles?.includes('ADMIN');
    if (!isAdmin) {
        return NextResponse.json(
            { success: false, message: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const { id } = await params;

        const existingBlog = await prisma.blogPost.findUnique({
            where: { id },
        });

        if (!existingBlog) {
            return NextResponse.json(
                { success: false, message: 'Blog not found' },
                { status: 404 }
            );
        }

        await prisma.blogPost.delete({
            where: { id },
        });

        return NextResponse.json(
            { success: true, message: 'Blog deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in DELETE /api/blog/[id]:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete blog' },
            { status: 500 }
        );
    }
}
