import React from 'react'
import Title from '../Title/Title';
import BlogCard from '../Card/BlogCard';
import { getBlogs } from '@/lib/getBlogs';

const News = async () => {
    const blogs = await getBlogs();
    console.log(blogs);

    return (
        <section className='global-padding layout'>
            <Title title="Our Latest Posts" className='text-center' />
            <div className='mt-7 w-full grid md:grid-cols-3 grid-cols-1 gap-10'>
                {
                    blogs.success ? blogs?.blogs?.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    )) : (
                        <p className='text-center text-gray-500'>No blogs found</p>
                    )
                }
            </div>
        </section>
    )
}

export default News;