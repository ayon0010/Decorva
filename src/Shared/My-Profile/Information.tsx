import { Pen } from 'lucide-react';
import React from 'react'

const Information = () => {
    return (
        <div className='flex flex-col gap-4'>
            <h2 className={`product-title mb-0!`}>User information</h2>
            <p>
                Here you can enter or edit public information about yourself. The data will be used in the future for ordering. The changes you make will be displayed immediately after saving.
            </p>
            <div className='flex flex-col gap-6'>
                <form className='flex flex-col gap-4'>
                    <div className='flex items-center justify-between pb-1 global-b-bottom'>
                        <h3 className='text-lg leading-[100%]'>Full name</h3>
                        <div className='flex items-center gap-2 text-sm leading-[100%] cursor-pointer'>
                            <Pen className='w-4 h-4 cursor-pointer' />
                            Edit
                        </div>
                    </div>
                    <div className='mt-1 grid grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="firstName" className='text-sm font-medium'>First name</label>
                            <input id="firstName" type="text" placeholder='Enter first name' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="lastName" className='text-sm font-medium'>Last name</label>
                            <input id="lastName" type="text" placeholder='Enter last name' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' />
                        </div>
                    </div>
                    <button type='submit' className='w-full bg-primary text-white py-3 px-4 rounded-sm transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]'>Save Changes</button>
                </form>
                <form className='flex flex-col gap-4'>
                    <div className='flex items-center justify-between pb-1 global-b-bottom'>
                        <h3 className='text-lg leading-[100%]'>Contact info</h3>
                        <div className='flex items-center gap-2 text-sm leading-[100%] cursor-pointer'>
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
                    <button type='submit' className='w-full bg-primary text-white py-3 px-4 rounded-sm transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]'>Save Changes</button>
                </form>
                <form className='flex flex-col gap-4'>
                    <div className='flex items-center justify-between pb-1 global-b-bottom'>
                        <h3 className='text-lg leading-[100%]'>Billing Address</h3>
                        <div className='flex items-center gap-2 text-sm leading-[100%] cursor-pointer'>
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
                    <button type='submit' className='w-full bg-primary text-white py-3 px-4 rounded-sm transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]'>Save Changes</button>
                </form>
                <form className='flex flex-col gap-4'>
                    <div className='flex items-center justify-between pb-1 global-b-bottom'>
                        <h3 className='text-lg leading-[100%]'>Shipping Address</h3>
                        <div className='flex items-center gap-2 text-sm leading-[100%] cursor-pointer'>
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
                    <button type='submit' className='w-full bg-primary text-white py-3 px-4 rounded-sm transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]'>Save Changes</button>
                </form>
            </div>
        </div>
    )
}

export default Information;