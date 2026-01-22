import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import { lora } from '../font/Rubik';

const Footer = () => {
    return (
        <footer className='bg-[#F2F5F1]'>
            <div className='global-padding layout flex items-start justify-between py-10 lg:py-20'>
                <div>
                    <h3 className='footer-title'>Opening Time</h3>
                    <ul className='space-y-2'>
                        <li className='text-sm leading-[30px]'>Mon - Fri: 8AM - 10PM</li>
                        <li className='text-sm leading-[30px]'>Sat: 9AM-8PM</li>
                        <li className='text-sm leading-[30px]'>Suns: 14hPM-18hPM</li>
                    </ul>
                    <p className='text-sm leading-[30px] mt-6'>
                        <strong>We Work All The Holidays</strong>
                    </p>
                </div>
                <div>
                    <h3 className='footer-title'>Information</h3>
                    <ul className='space-y-2'>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>About Us</li>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>Checkout</li>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>Contact</li>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>Frequently Questions</li>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>Wishlist</li>
                    </ul>
                </div>
                <div>
                    <h2 className='global-h2 text-center'>Decorva</h2>
                    <div>
                        <ul className='flex items-center gap-4 mt-6'>
                            <li>
                                <Link href={"/"} className='inline-block text-sm leading-[30px]'>
                                    Payment
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className='inline-block text-sm leading-[30px]'>
                                    Delivery
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className='inline-block text-sm leading-[30px]'>
                                    Return
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className='inline-block text-sm leading-[30px]'>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='flex items-center gap-4 mt-6 justify-center'>
                        <div className='p-3 bg-[#E1E1E1] rounded-full'>
                            <Facebook fill='black' />
                        </div>
                        <div className='p-3 bg-[#E1E1E1] rounded-full'>
                            <Instagram />
                        </div>
                        <div className='p-3 bg-[#E1E1E1] rounded-full'>
                            <Twitter fill='black' />
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className='footer-title'>My Account</h3>
                    <ul className='space-y-2'>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>My Account</li>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>Contact</li>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>Shopping cart</li>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>Checkout</li>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>Order History
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className='footer-title'>Customer Service</h3>
                    <ul className='space-y-2'>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>Contact Us</li>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>Terms & Conditions</li>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>Privacy Policy</li>
                        <li className='text-sm leading-[30px] hover:text-primary transition-colors duration-300 text-black'>Refund Policy</li>
                    </ul>
                </div>
            </div>
            <div className='global-padding layout flex items-center justify-between border-t border-t-[#E1E1E1] py-6'>
                <p className='text-sm leading-[30px]'>© 2026 Decorva. All rights reserved.</p>
                <span className={`text-[8px] leading-[10px] ${lora.className}`}> mady by <a href="https://wa.me/+8801726108060" target="_blank" rel="noopener noreferrer" className='text-primary cursor-pointer hover:underline transition-all duration-300'>Shariar Ayon</a></span>
            </div>
        </footer>
    )
}

export default Footer;