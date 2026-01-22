import React from 'react'
import PageTitle from '@/Shared/PageTitle/PageTitle';
import productImage from "../../../../public/product7.webp"
import Image from 'next/image';
import { Star } from 'lucide-react';

const ProductPage = () => {
    return (
        <div>
            <PageTitle title="Product" subTitle="Home / Product" />
            <div className='lg:my-20 my-10'>
                <section className='flex items-start justify-between gap-7 layout global-padding'>
                    <aside className='lg:w-1/2 w-full overflow-hidden rounded-sm border border-[#E1E1E1]'>
                        <Image src={productImage} alt="product" width={570} height={570} className='w-full h-full object-cover aspect-[1]' />
                    </aside>
                    <aside className='lg:w-1/2 w-full space-y-6'>
                        <h2 className='product-title hover:text-primary transition-colors duration-300 text-black'>
                            commodo augue nisi
                        </h2>
                        <div className='flex items-center gap-1'>
                            <Star className='text-yellow-500 w-4 h-4' />
                            <Star className='text-yellow-500 w-4 h-4' />
                            <Star className='text-yellow-500 w-4 h-4' />
                            <Star className='text-yellow-500 w-4 h-4' />
                            <Star className='text-yellow-500 w-4 h-4' />
                        </div>
                        <div className='flex items-center gap-3'>
                            <span className='text-[23px] font-medium leading-[16px] text-primary'>100د.إ</span>
                            <span className='text-[20px] font-normal leading-[16px] line-through text-black'>120د.إ</span>
                        </div>
                        <p className='pb-6 border-b border-[#E1E1E1] text-base leading-[24px] font-normal text-black'>
                            eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus
                            eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non
                            neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et
                            placerat vestibulum, metus nisi posuere nisl, in
                        </p>
                        <h3 className='text-lg capitalize font-medium leading-[30px]'>Available Options</h3>
                    </aside>
                </section>
            </div>
        </div>
    )
}

export default ProductPage;