import PageTitle from '@/Shared/PageTitle/PageTitle'
import React from 'react'

const Cart = () => {
    return (
        <div>
            <div className='global-margin'>
                <PageTitle title="Cart" subTitle="Home / Cart" />
            </div>
            <section className='global-padding layout flex items-start gap-6 global-margin'>
                <div className='flex-1'>
                    <div className='py-3 px-4 text-white uppercase text-base font-medium bg-[#222222]'>
                        Coupon
                    </div>
                    <div className='border border-[#E1E1E1] p-4 flex flex-col gap-4'>
                        <p>Enter your coupon code if you have one</p>
                        <div className='flex items-center gap-2 max-w-[400px] w-full'>
                            <input type="text" placeholder='Enter coupon code' className='border border-[#E1E1E1] rounded-sm px-4 py-2' />
                            <button type="button" className='bg-[#222222] text-white px-4 py-2 rounded-sm cursor-pointer active:scale-[0.98] transition-all duration-300'>Apply Coupon</button>
                        </div>
                    </div>
                </div>
                <div className='flex-1'>
                    <div className='py-3 px-4 text-white uppercase text-base font-medium bg-[#222222]'>
                        Cart Total
                    </div>
                    <div className='border border-[#E1E1E1] p-4 flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 border-b border-b-[#E1E1E1] pb-4'>
                            <div className='flex items-center justify-between'>
                                <p className='text-sm font-medium'>Subtotal</p>
                                <p className='text-sm font-medium'>100د.إ</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-sm font-medium'>Shipping</p>
                                <p className='text-sm font-medium'>10د.إ</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-sm font-medium'>Total</p>
                            <p className='text-sm font-medium'>110د.إ</p>
                        </div>
                        <button type="button" className='bg-primary text-white px-4 py-2 rounded-sm cursor-pointer active:scale-[0.98] transition-all duration-300 w-fit ml-auto'>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Cart;