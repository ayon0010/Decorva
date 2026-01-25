"use client"
import PageTitle from '@/Shared/PageTitle/PageTitle'
import React, { useState } from 'react'

const Checkout = () => {
    const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
    const handleShipToDifferentAddress = () => {
        setShipToDifferentAddress(!shipToDifferentAddress);
    }
    return (
        <div>
            <div className='global-margin'>
                <PageTitle title="Checkout" subTitle="Home / Checkout" />
            </div>
            <section className='global-padding layout flex items-start gap-6 global-margin'>
                <div className='flex-1'>
                    <div className='py-3 px-4 text-white uppercase text-base font-medium bg-[#222222]'>
                        Billing Details
                    </div>
                    <div className='mt-4 grid grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="first-name" className='text-sm font-medium'>First Name</label>
                            <input type="text" id="first-name" placeholder='Enter first name' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="last-name" className='text-sm font-medium'>Last Name</label>
                            <input type="text" id="last-name" placeholder='Enter last name' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className='text-sm font-medium'>Email</label>
                            <input type="email" id="email" placeholder='Enter email' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="phone" className='text-sm font-medium'>Phone</label>
                            <input type="tel" id="phone" placeholder='Enter phone' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="address" className='text-sm font-medium'>Address</label>
                            <input type="text" id="address" placeholder='Enter address' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="city" className='text-sm font-medium'>City</label>
                            <input type="text" id="city" placeholder='Enter city' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="state" className='text-sm font-medium'>State</label>
                            <input type="text" id="state" placeholder='Enter state' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="postcode" className='text-sm font-medium'>Postcode</label>
                            <input type="text" id="postcode" placeholder='Enter postcode' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2 col-span-2'>
                            <label htmlFor="country" className='text-sm font-medium'>Country</label>
                            <input type="text" id="country" placeholder='Enter country' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                    </div>
                    <div className='flex items-center gap-2 mt-4'>
                        <input type='checkbox' id='ship-to-different-address' className='w-4 h-4' onChange={handleShipToDifferentAddress} />
                        <label htmlFor="ship-to-different-address" className='text-sm font-medium cursor-pointer bg-[#222222] text-white px-4 py-2 rounded-sm'>Ship to a different address?</label>
                    </div>
                    <div className={`mt-4 grid grid-cols-2 gap-4 ${shipToDifferentAddress ? 'block' : 'hidden'}`}>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="first-name" className='text-sm font-medium'>First Name</label>
                            <input type="text" id="first-name" placeholder='Enter first name' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="last-name" className='text-sm font-medium'>Last Name</label>
                            <input type="text" id="last-name" placeholder='Enter last name' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className='text-sm font-medium'>Email</label>
                            <input type="email" id="email" placeholder='Enter email' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="phone" className='text-sm font-medium'>Phone</label>
                            <input type="tel" id="phone" placeholder='Enter phone' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="address" className='text-sm font-medium'>Address</label>
                            <input type="text" id="address" placeholder='Enter address' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="city" className='text-sm font-medium'>City</label>
                            <input type="text" id="city" placeholder='Enter city' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="state" className='text-sm font-medium'>State</label>
                            <input type="text" id="state" placeholder='Enter state' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="postcode" className='text-sm font-medium'>Postcode</label>
                            <input type="text" id="postcode" placeholder='Enter postcode' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                        <div className='flex flex-col gap-2 col-span-2'>
                            <label htmlFor="country" className='text-sm font-medium'>Country</label>
                            <input type="text" id="country" placeholder='Enter country' className='w-full border border-[#E1E1E1] rounded-sm px-4 py-2' />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="note" className='text-sm font-medium'>Order Notes</label>
                        <textarea name="note" id="note" placeholder='Enter note' className='w-full resize-none border border-[#E1E1E1] rounded-sm px-4 py-2 mt-2 h-[100px]' />
                    </div>
                </div>
                <div className='flex-1'>
                    <div className='py-3 px-4 text-white uppercase text-base font-medium bg-[#222222]'>
                        Your Order
                    </div>
                    <div className='mt-4'>
                        <table className='w-full mt-4 border-collapse'>
                            <thead>
                                <tr className='bg-[#E1E1E1]'>
                                    <th className='text-base font-medium text-center w-1/2 p-4'>Product</th>
                                    <th className='text-base font-medium text-center w-1/2 p-4'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-b border-[#E1E1E1]'>
                                    <td className='text-center p-4 border-r border-[#E1E1E1]'>Handbag fringilla × 2</td>
                                    <td className='text-center p-4'>200د.إ</td>
                                </tr>
                                <tr className='border-b border-[#E1E1E1]'>
                                    <td className='text-center p-4 border-r border-[#E1E1E1]'>Subtotal</td>
                                    <td className='text-center p-4'>200د.إ</td>
                                </tr>
                                <tr className='border-b border-[#E1E1E1]'>
                                    <td className='text-center p-4 border-r border-[#E1E1E1]'>Shipping</td>
                                    <td className='text-center p-4'>10د.إ</td>
                                </tr>
                                <tr className='border-b border-[#E1E1E1]'>
                                    <td className='text-center p-4 border-r border-[#E1E1E1]'>Total</td>
                                    <td className='text-center p-4'>210د.إ</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" className='bg-primary text-white px-4 py-2 rounded-sm cursor-pointer active:scale-[0.98] transition-all duration-300 w-fit mt-4 block'>
                            Place Order
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Checkout