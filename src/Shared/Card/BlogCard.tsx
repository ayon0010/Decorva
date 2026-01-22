import React from 'react'
import blogImage from "../../../public/blog2.webp"
import Image from 'next/image';
import Link from 'next/link';


const BlogCard = () => {
    return (
        <div className='w-fit h-fit space-y-6 max-w-[372px] w-full'>
            <Image src={blogImage} alt="blog" width={372} height={232} className='object-cover aspect-[372/232]' />
            <figcaption className='space-y-6'>
                <div>
                    <h4 className='text-lg leading-[21px] font-medium text-black hover:text-primary transition-colors duration-300'>Post With Audio</h4>
                    <div className='text-[13px] leading-[15px] mt-1'>
                        By <span className='text-primary'>admin / July 20, 2023</span>
                    </div>
                </div>
                <p className='text-sm leading-[24px] pb-[21px] border-b border-b-[#e1e1e1]'>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras
                    pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus praesent</p>
                <footer>
                    <Link href={"/"} className='underline text-sm leading-[100%] inline-block hover:text-primary transition-colors duration-300'>
                        Continue Reading
                    </Link>
                </footer>
            </figcaption>
        </div>
    )
}

export default BlogCard;