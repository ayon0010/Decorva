'use client'
import React, { useState } from 'react'

const ProductBrand = () => {
    const [newBrand, setNewBrand] = useState<boolean>(false);

    console.log(newBrand);

    return (
        <div className='bg-white p-3 flex flex-col gap-2 border border-black/30'>
            <div className='text-base border-b border-b-black/30 pb-2'>
                Product Brand
            </div>
            <div className='mt-1'>
                <div className='flex flex-col gap-2 border border-black/30 rounded-sm p-2'>
                    <span className='text-xs cursor-pointer'>All Brands</span>
                    <label htmlFor='all-brands' className='flex items-center gap-2 cursor-pointer'>
                        <input id='all-brands' type='checkbox' className='w-3 h-3' title='All Brands' />
                        <span className='text-xs'>Toshiba</span>
                    </label>
                </div>
            </div>
            <div className='text-primary cursor-pointer text-xs' onClick={() => setNewBrand(!newBrand)}>
                + Add new brand
            </div>
            {
                newBrand && (
                    <div className='flex flex-col gap-2'>
                        <input type='text' placeholder='Brand name' className='border border-black/30 rounded-sm p-2' title='Brand name' />
                        <button type='button' className='bg-primary text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-primary/80 transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2'>Add new brand</button>
                    </div>
                )
            }
        </div>
    )
}

export default ProductBrand