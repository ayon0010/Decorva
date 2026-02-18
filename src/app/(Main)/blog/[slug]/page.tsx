import PageTitle from '@/Shared/PageTitle/PageTitle';
import { getBlogBySlug, getBlogs } from '@/lib/getBlogs';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react'
import blogImage from '@/../public/blog2.webp';


export async function generateStaticParams() {
    const blogs = await getBlogs();
    if (!blogs.success) {
        return [];
    }
    return blogs.blogs?.map((blog) => ({ slug: blog.slug })) ?? [];
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);
    if (!blog.success) {
        return { title: 'Blog not found' };
    }
    return {
        title: blog.blog?.title ?? '',
        description: blog.blog?.content ?? '',
        openGraph: {
            title: blog.blog?.title ?? '',
            description: blog.blog?.content ?? '',
        },
    }
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);
    if (!blog.success) {
        return <div>Blog not found</div>;
    }

    return (
        <div>
            <PageTitle title={blog.blog?.title ?? ''} subTitle={`Home / Blog / ${blog.blog?.slug ?? ''}`} />
            <div className="layout global-padding lg:py-20 py-10">
                <div className='flex flex-wrap md:flex-row flex-col gap-10'>
                    <div className='w-full md:w-3/4 space-y-6'>
                        {/* Blog Title and Date */}
                        <div className='space-y-1'>
                            <h2 className='text-3xl font-medium'>{blog.blog?.title}</h2>
                            <p className='text-sm leading-[24px] font-normal'>Posted by : admin / On : <span className='text-primary'>{new Date(blog.blog?.createdAt ?? '').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                        </div>
                        {/* Feature Image */}
                        <Image
                            src={blog.blog?.featuredImage ?? blogImage}
                            alt={blog.blog?.title ?? ''}
                            width={875}
                            height={545}
                            className='w-full aspect-[875/545] object-cover'
                            priority
                        />
                        {/* Content */}
                        <div>
                            
                        </div>
                    </div>
                    <div className='w-full md:w-1/4'></div>
                </div>
            </div>
        </div>
    )
}

export default page;