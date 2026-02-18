import type { Metadata } from "next";
import PageTitle from '@/Shared/PageTitle/PageTitle'
import React from 'react'
import { getBlogs } from "@/lib/getBlogs";
import BlogCard from "@/Shared/Card/BlogCard";

export const metadata: Metadata = {
    title: "Blog",
    description: "Decorva news, trends and interior design tips. Inspiration and ideas to beautify your home.",
};

const Blog = async () => {
    const blogs = await getBlogs();
    return (
        <div>
            <PageTitle title="Blog" subTitle="Home / Blog" />
            <div className="layout global-padding lg:py-20 py-10">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
                    {
                        blogs.success ? blogs?.blogs?.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        )) : (
                            <p className='text-center text-gray-500'>No blogs found</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Blog