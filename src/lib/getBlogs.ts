import { prisma } from "./prisma";

export async function getBlogs() {
    try {
        const blogs = await prisma.blogPost.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 3,
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