"use client"
import React from 'react'
import ProductCard from '../Card/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Offers = ({ products }: { products: { id: string, images: { url: string }[], name: string, price: number, regularPrice: number, salePrice: number, slug: string }[] }) => {
    return (
        <div className='mt-10 w-full'>
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
                navigation={true}
                loop={true}
                aria-live="polite"
                aria-label="Product Carousel"
                className="product-carousel hero-slider"
            >
                {products?.map((product) => (
                    <SwiperSlide className='grid grid-cols-4 grid-rows-2 gap-6' key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Offers