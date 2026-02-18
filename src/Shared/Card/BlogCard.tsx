import React from 'react'
import blogImage from "../../../public/blog2.webp"
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@prisma/client';

const BlogCard = ({ blog }: { blog: BlogPost }) => {
    const truncateContent = (text: string, maxLength: number = 100): string => {
        if (!text) return '';
        // Remove HTML tags using regex (works on both server and client)
        const plainText = text.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
        if (plainText.length <= maxLength) return plainText;
        return plainText.slice(0, maxLength).trim() + '...';
    };
    const shortContent = truncateContent(blog.contentHtml || blog.content || '', 100);

    return (
        <div className='h-fit space-y-6 w-full'>
            <Image src={blog.featuredImage ?? blogImage} alt={blog.title || 'Blog Image'} width={372} height={232} className='object-cover aspect-[372/232] w-full' />
            <figcaption className='space-y-6'>
                <div className='space-y-2'>
                    <h4 className='text-lg leading-[21px] font-medium text-black hover:text-primary transition-colors duration-300'>{blog.title}</h4>
                    <div className='text-[13px] leading-[15px] mt-1'>
                        By <span className='text-primary'>admin / {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
                <p className='text-sm leading-[24px] pb-[21px] border-b border-b-[#e1e1e1]'>{shortContent}</p>
                <footer>
                    <Link href={`/blog/${blog.slug}`} className='underline text-sm leading-[100%] inline-block hover:text-primary transition-colors duration-300'>
                        Continue Reading
                    </Link>
                </footer>
            </figcaption>
        </div>
    )
}

export default BlogCard;