import { Edit, Eye, Image as ImageIcon, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import product from '@/../public/product7.webp'
import Image from 'next/image'

const AllProductsPage = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <span className='text-2xl font-semibold'>
                    Products
                </span>
                <button type='button' className='bg-primary text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-primary/80 transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2'>
                    <Link href='/dashboard/products/add'>
                        Add new product
                    </Link>
                </button>
            </div>
            <div className='flex items-center gap-2'>
                <select title='Select a category' className='border border-black/30 rounded-sm p-2'>
                    <option value='all'>Select a category</option>
                    <option value='uncategorised'>Uncategorised</option>
                </select>
                <select title='Filter by Product Type' className='border border-black/30 rounded-sm p-2'>
                    <option value='all'>Select a product type</option>
                    <option value='simple'>Simple</option>
                    <option value='variable'>Variable</option>
                </select>
                <select title='Filter by Stock Status' className='border border-black/30 rounded-sm p-2'>
                    <option value='all'>Select a stock status</option>
                    <option value='in-stock'>In Stock</option>
                    <option value='out-of-stock'>Out of Stock</option>
                </select>
                <select title='Filter by Brand' className='border border-black/30 rounded-sm p-2'>
                    <option value='all'>Select a brand</option>
                    <option value='brand-1'>Brand 1</option>
                    <option value='brand-2'>Brand 2</option>
                    <option value='brand-3'>Brand 3</option>
                </select>
            </div>
            <div>
                <table className='w-full border-collapse bg-white p-3 border border-black/30 text-xs'>
                    <thead className='bg-[#FAFAFA] border-b border-b-black/50'>
                        <tr className='text-left'>
                            <th className='p-2'>
                                <ImageIcon className='w-4 h-4 mx-auto' />
                            </th>
                            <th className='p-2 text-left'>
                                Name
                            </th>
                            <th className='p-2'>
                                SKU
                            </th>
                            <th className='p-2'>
                                Stock Status
                            </th>
                            <th className='p-2'>
                                Price
                            </th>
                            <th className='p-2'>
                                Categories
                            </th>
                            <th className='p-2'>
                                Tags
                            </th>
                            <th className='p-2'>
                                Brands
                            </th>
                            <th className='p-2'>
                                Featured
                            </th>
                            <th className='p-2'>
                                Date
                            </th>
                            <th className='p-2'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-[#F6F7F7] border-b border-b-black/50'>
                            <td className='p-2 text-center'>
                                <Image src={product} alt='product' width={50} height={50} className='w-[50px] h-[50px] object-cover mx-auto' />
                            </td>
                            <td className='p-2 text-left'>
                                Indoor Plant
                            </td>
                            <td className='p-2 text-left'>
                                SKU123456
                            </td>
                            <td className='p-2 text-left'>
                                In Stock
                            </td>
                            <td className='p-2 text-left'>
                                100.00€
                            </td>
                            <td className='p-2 text-left'>
                                Category 1, Category 2
                            </td>
                            <td className='p-2 text-left'>
                                Tag 1, Tag 2
                            </td>
                            <td className='p-2 text-left'>
                                Brand 1
                            </td>
                            <td className='p-2 text-left'>
                                Yes
                            </td>
                            <td className='p-2 text-left'>
                                2026-01-01
                            </td>
                            <td className='p-2 text-center'>
                                <div className='flex items-center justify-center gap-2'>
                                    <Edit className='w-4 h-4 cursor-pointer hover:text-primary transition-all duration-200' />
                                    <Trash className='w-4 h-4 cursor-pointer hover:text-primary transition-all duration-200' />
                                    <Eye className='w-4 h-4 cursor-pointer hover:text-primary transition-all duration-200' />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr className='text-left'>
                            <th className='p-2'>
                                <ImageIcon className='w-4 h-4 mx-auto' />
                            </th>
                            <th className='p-2 text-left'>
                                Name
                            </th>
                            <th className='p-2'>
                                SKU
                            </th>
                            <th className='p-2'>
                                Stock Status
                            </th>
                            <th className='p-2'>
                                Price
                            </th>
                            <th className='p-2'>
                                Categories
                            </th>
                            <th className='p-2'>
                                Tags
                            </th>
                            <th className='p-2'>
                                Brands
                            </th>
                            <th className='p-2'>
                                Featured
                            </th>
                            <th className='p-2'>
                                Date
                            </th>
                            <th className='p-2'>
                                Actions
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default AllProductsPage