'use client'
import React, { useState } from 'react'
import PageTitle from '@/Shared/PageTitle/PageTitle';
import productImage from "../../../../public/product7.webp"
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';

const ProductPage = () => {

    const [activeTab, setActiveTab] = useState(0);


    return (
        <div>
            <PageTitle title="Product" subTitle="Home / Product" />
            <div className='lg:my-20 my-10'>
                <section className='flex items-start justify-between gap-7 layout global-padding'>
                    <aside className='lg:w-1/2 w-full grid grid-cols-2 gap-2 overflow-hidden rounded-sm border border-[#E1E1E1]'>
                        <Image src={productImage} alt="product" width={570} height={570} className='w-full h-full object-cover aspect-[1]' />
                        <Image src={productImage} alt="product" width={570} height={570} className='w-full h-full object-cover aspect-[1]' />
                        <Image src={productImage} alt="product" width={570} height={570} className='w-full h-full object-cover aspect-[1]' />
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
                        <button
                            type='button'
                            className="w-full bg-primary text-white py-3 px-4 rounded-sm hover:bg-primary/80 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]"
                        >
                            Add To Cart
                        </button>
                        <div className='flex items-center gap-2'>
                            <Heart fill='red' stroke='red' className='w-6 h-6' />
                            <span className='text-lg font-medium leading-[16px] text-black'>Add to Wishlist</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span>Category:</span>
                            <span className='text-lg font-medium leading-[16px] text-black'>Grass</span>
                        </div>
                    </aside>
                </section>
            </div>
            <div className='layout global-padding'>
                <div className='border border-[#E1E1E1] rounded-sm p-6'>
                    <ul className='flex items-center gap-10 text-[20px] leading-[26px] capitalize font-medium text-black border-b border-[#E1E1E1] pb-4'>
                        <li className={`cursor-pointer hover:text-primary transition-all duration-300 ${activeTab === 0 ? "text-primary" : "text-black"}`} onClick={() => setActiveTab(0)}>Description</li>
                        <li className={`cursor-pointer hover:text-primary transition-all duration-300 ${activeTab === 1 ? "text-primary" : "text-black"}`} onClick={() => setActiveTab(1)}>Reviews (0)</li>
                        <li className={`cursor-pointer hover:text-primary transition-all duration-300 ${activeTab === 2 ? "text-primary" : "text-black"}`} onClick={() => setActiveTab(2)}>Specification</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;