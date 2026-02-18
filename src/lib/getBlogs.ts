import { prisma } from "./prisma";

export async function getBlogs(take?: number) {
    try {
        const blogs = await prisma.blogPost.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: take ?? undefined,
        });
        return {
            success: true,
            blogs,
        };
    } catch {
        return {
            success: false,
            message: 'Failed to get blogs',
        };
    }
}

export async function getBlogBySlug(slug: string) {
    try {
        const blog = await prisma.blogPost.findUnique({
            where: { slug },
        });
        return {
            success: true,
            blog,
        };
    } catch {
        return {
            success: false,
            message: 'Failed to get blog',
        };
    }
}