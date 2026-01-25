"use client"
import React, { useState } from 'react'
import { Pen } from 'lucide-react';

const ForthForm = () => {
    const [show, setShow] = useState<boolean>(false);
    return (
        <form className='flex flex-col gap-4'>
            <div className='flex items-center justify-between pb-1 global-b-bottom'>
                <h3 className='text-lg leading-[100%]'>Shipping Address</h3>
                <div onClick={() => setShow(!show)} className='flex items-center gap-2 text-sm leading-[100%] cursor-pointer'>
                    <Pen className='w-4 h-4 cursor-pointer' />
                    Edit
                </div>
            </div>
            <div className='mt-1 grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="address1" className='text-sm font-medium'>Address 1</label>
                    <input id="address1" type="text" placeholder='Enter address 1' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="address2" className='text-sm font-medium'>Address 2</label>
                    <input id="address2" type="text" placeholder='Enter address 2' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="city" className='text-sm font-medium'>City</label>
                    <input id="city" type="text" placeholder='Enter city' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="state" className='text-sm font-medium'>State</label>
                    <input id="state" type="text" placeholder='Enter state' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="postcode" className='text-sm font-medium'>Postcode</label>
                    <input id="postcode" type="text" placeholder='Enter postcode' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="country" className='text-sm font-medium'>Country</label>
                    <input id="country" type="text" placeholder='Enter country' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' />
                </div>
            </div>
            {
                show && (
                    <button type='submit' className='w-full bg-primary text-white py-3 px-4 rounded-sm transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]'>Save Changes</button>
                )
            }
        </form>
    )
}

export default ForthForm;   