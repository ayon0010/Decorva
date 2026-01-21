"use client";
import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import slider1 from '../../../public/slider1.webp';
import slider2 from '../../../public/slider2.webp';
import slider3 from '../../../public/slider3.webp';
import Image from 'next/image';
import 'swiper/css/effect-fade';
import gsap from 'gsap';


const Slider = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const titleRef1 = useRef<HTMLHeadingElement>(null);
    const titleRef2 = useRef<HTMLHeadingElement>(null);
    const titleRef3 = useRef<HTMLHeadingElement>(null);
    const descRef1 = useRef<HTMLParagraphElement>(null);
    const descRef2 = useRef<HTMLParagraphElement>(null);
    const descRef3 = useRef<HTMLParagraphElement>(null);
    const buttonRef1 = useRef<HTMLButtonElement>(null);
    const buttonRef2 = useRef<HTMLButtonElement>(null);
    const buttonRef3 = useRef<HTMLButtonElement>(null);

    // Animation initiale au chargement
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.1 });
        
        if (titleRef1.current) {
            gsap.set(titleRef1.current, {
                x: -window.innerWidth,
                opacity: 0
            });
            tl.to(titleRef1.current, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            });
        }
        
        if (descRef1.current) {
            gsap.set(descRef1.current, {
                x: -window.innerWidth,
                opacity: 0
            });
            tl.to(descRef1.current, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            }, "-=0.3");
        }
        
        if (buttonRef1.current) {
            gsap.set(buttonRef1.current, {
                x: -window.innerWidth,
                opacity: 0
            });
            tl.to(buttonRef1.current, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            }, "-=0.3");
        }
    }, []);

    // Animation du titre, description et bouton lors du changement de slide
    useEffect(() => {
        const titles = [titleRef1.current, titleRef2.current, titleRef3.current];
        const descriptions = [descRef1.current, descRef2.current, descRef3.current];
        const buttons = [buttonRef1.current, buttonRef2.current, buttonRef3.current];
        
        const currentTitle = titles[activeIndex];
        const currentDesc = descriptions[activeIndex];
        const currentButton = buttons[activeIndex];

        // Créer une timeline pour orchestrer les animations avec délais
        const tl = gsap.timeline();

        if (currentTitle) {
            gsap.set(currentTitle, {
                x: -window.innerWidth,
                opacity: 0
            });
            tl.to(currentTitle, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            });
        }

        if (currentDesc) {
            gsap.set(currentDesc, {
                x: -window.innerWidth,
                opacity: 0
            });
            tl.to(currentDesc, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            }, "-=0.3"); // Commence 0.5s avant la fin de l'animation précédente
        }

        if (currentButton) {
            gsap.set(currentButton, {
                x: -window.innerWidth,
                opacity: 0
            });
            tl.to(currentButton, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            }, "-=0.3"); // Commence 0.5s avant la fin de l'animation précédente
        }

        // Réinitialiser les autres éléments hors écran
        titles.forEach((title, index) => {
            if (title && index !== activeIndex) {
                gsap.set(title, {
                    x: -window.innerWidth,
                    opacity: 0
                });
            }
        });
        
        descriptions.forEach((desc, index) => {
            if (desc && index !== activeIndex) {
                gsap.set(desc, {
                    x: -window.innerWidth,
                    opacity: 0
                });
            }
        });
        
        buttons.forEach((button, index) => {
            if (button && index !== activeIndex) {
                gsap.set(button, {
                    x: -window.innerWidth,
                    opacity: 0
                });
            }
        });
    }, [activeIndex]);




    return (
        <section
            className='max-h-[768px] w-full h-dvh relative flex flex-col'
            role="region"
            aria-label="Featured promotions slider"
        >
            <Swiper
                // Install Swiper modules
                modules={[Navigation, Pagination, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={1000}
                pagination={{ clickable: true }}
                loop={true}
                aria-live="polite"
                aria-label="Promotional content carousel"
                className=" h-full w-full hero-slider"
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                <SwiperSlide>
                    <article
                        className="w-full h-full relative overflow-hidden flex items-center"
                        role="article"
                        aria-labelledby="slider1-title"
                        aria-describedby="slider1-description"
                    >
                        <Image
                            src={slider1}
                            alt="slider1"
                            fill
                            priority={true}
                            className="object-cover object-center absolute inset-0 z-40"
                        />
                        <div className="relative z-50 global-padding text-white flex flex-col gap-8">
                            <h1 ref={titleRef1} className='uppercase text-black font-bold global-h1' >Top Sale</h1>
                            <p ref={descRef1} className='lg:text-[20px] text-base text-black leading-[100%]'>Discount <span className='text-primary'>20% Off</span> On All Products</p>
                            <button ref={buttonRef1} type='button' className='bg-primary text-white uppercase w-fit font-medium text-[15px] leading-[65px] px-8 rounded-[40px]'>
                                Discover Now
                            </button>
                        </div>
                    </article>
                </SwiperSlide>
                <SwiperSlide>
                    <article
                        className="w-full h-full relative overflow-hidden flex items-center"
                        role="article"
                        aria-labelledby="slider2-title"
                        aria-describedby="slider2-description"
                    >
                        <Image
                            src={slider2}
                            alt="slider2"
                            fill
                            priority={true}
                            className="object-cover object-center absolute inset-0 z-40"
                        />
                        <div className="relative z-50 global-padding text-white flex flex-col gap-8">
                            <h2 ref={titleRef2} className='uppercase text-black font-bold global-h1' >Big Sale</h2>
                            <p ref={descRef2} className='lg:text-[20px] text-base text-black leading-[100%]'>Discount <span className='text-primary'>20% Off</span> On All Products</p>
                            <button ref={buttonRef2} type='button' className='bg-primary text-white uppercase w-fit font-medium text-[15px] leading-[65px] px-8 rounded-[40px]'>
                                Discover Now
                            </button>
                        </div>
                    </article>
                </SwiperSlide>
                <SwiperSlide>
                    <article
                        className="w-full h-full relative overflow-hidden flex items-center"
                        role="article"
                        aria-labelledby="slider3-title"
                        aria-describedby="slider3-description"
                    >
                        <Image
                            src={slider3}
                            alt="slider3"
                            fill
                            priority={true}
                            className="object-cover object-center absolute inset-0 z-40"
                        />
                        <div className="relative z-50 global-padding text-white flex flex-col gap-8">
                            <h2 ref={titleRef3} className='uppercase text-black font-bold global-h1' >Lovely Plants</h2>
                            <p ref={descRef3} className='lg:text-[20px] text-base text-black leading-[100%]'>Discount <span className='text-primary'>20% Off</span> On All Products</p>
                            <button ref={buttonRef3} type='button' className='bg-primary text-white uppercase w-fit font-medium text-[15px] leading-[65px] px-8 rounded-[40px]'>
                                Discover Now
                            </button>
                        </div>
                    </article>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Slider;