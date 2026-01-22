import React from 'react'
import Title from '../Title/Title';
import BlogCard from '../Card/BlogCard';

const News = () => {
    return (
        <section className='global-padding layout'>
            <Title title="Our Latest Posts" className='text-center' />
            <div className='mt-7 w-full flex items-center justify-center gap-x-10'>
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </div>
        </section>
    )
}

export default News;