import Image from 'next/image';
import React from 'react'
import feature1 from '../../../public/shipping1 (1).webp';
import feature2 from '../../../public/shipping2.webp';
import feature3 from '../../../public/shipping3.webp';
import { lora } from '../font/Rubik';

const Feature = () => {
    return (
        <div className={`${lora.className} global-padding layout flex md:flex-row flex-col md:items-center items-start justify-between md:gap-6 gap-10`}>
            <div className='flex items-center gap-3 flex-1 border-r border-r-[#ebebeb]'>
                <Image src={feature1} alt='feature1' width={48} height={32} className='object-cover' />
                <div className='flex flex-col gap-2'>
                    <h3 className='text-sm leading-[110%] capitalize font-bold'>Free Shipping</h3>
                    <p className='text-sm leading-[18px] font-light'>Free shipping around the world for all <br />
                        orders over $120</p>
                </div>
            </div>
            <div className='flex items-center gap-3 flex-1 border-r border-r-[#ebebeb]'>
                <Image src={feature2} alt='feature1' width={48} height={32} className='object-cover' />
                <div className='flex flex-col gap-2'>
                    <h3 className='text-sm leading-[110%] capitalize font-bold'>Safe Payment</h3>
                    <p className='text-sm leading-[18px] font-light'>With our payment gateway, don’t worry <br />
                    about your information</p>
                </div>
            </div>
            <div className='flex items-center gap-3 flex-1'>
                <Image src={feature3} alt='feature1' width={48} height={32} className='object-cover' />
                <div className='flex flex-col gap-2'>
                    <h3 className='text-sm leading-[110%] capitalize font-bold'>Friendly Services</h3>
                    <p className='text-sm leading-[18px] font-light'>You have 30-day return guarantee for <br />
                    every single order</p>
                </div>
            </div>
        </div>
    )
}

export default Feature;