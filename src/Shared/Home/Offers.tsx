// "use client"
// import React from 'react'
// import ProductCard from '../Card/ProductCard'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';

// const Offers = () => {
//     return (
//         <div className='mt-10 w-full'>
//             <Swiper
//                 modules={[Navigation]}
//                 spaceBetween={20}
//                 slidesPerView={1}
//                 breakpoints={{
//                     640: {
//                         slidesPerView: 2,
//                     },
//                     768: {
//                         slidesPerView: 3,
//                     },
//                     1024: {
//                         slidesPerView: 4,
//                     },
//                     1536: {
//                         slidesPerView: 5,
//                     },
//                 }}
//                 navigation={true}
//                 loop={true}
//                 aria-live="polite"
//                 aria-label="Product Carousel"
//                 className="product-carousel hero-slider"
//             >
//                 <SwiperSlide>
//                     <ProductCard />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <ProductCard />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <ProductCard />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <ProductCard />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <ProductCard />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <ProductCard />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <ProductCard />
//                 </SwiperSlide>
//             </Swiper>
//         </div>
//     )
// }

// export default Offers