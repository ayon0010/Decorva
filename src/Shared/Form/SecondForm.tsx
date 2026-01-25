"use client"
import React, { useState } from 'react'
import { Pen } from 'lucide-react';

const SecondForm = () => {
    const [show, setShow] = useState<boolean>(false);
    return (
        <form className='flex flex-col gap-4'>
            <div className='flex items-center justify-between pb-1 global-b-bottom'>
                <h3 className='text-lg leading-[100%]'>Contact info</h3>
                <div onClick={() => setShow(!show)} className='flex items-center gap-2 text-sm leading-[100%] cursor-pointer'>
                    <Pen className='w-4 h-4 cursor-pointer' />
                    Edit
                </div>
            </div>
            <div className='mt-1 grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="phone" className='text-sm font-medium'>Phone</label>
                    <input id="phone" type="text" placeholder='Enter phone' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='text-sm font-medium'>Email</label>
                    <input id="email" type="text" placeholder='Enter email' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' />
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

export default SecondForm;