/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Edit, Eye, Image as ImageIcon, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2'

const AllProductsPage = () => {

    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const response = await fetch('/api/product');
            const data = await response.json();
            return data.products;
        }
    })


    const handleDelete = async (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleting...',
                    text: 'Please wait while we delete the product...',
                    icon: 'info',
                    showCancelButton: false,
                    showConfirmButton: false,
                });
                const response = await fetch(`/api/product/${id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (data.success) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: data.message,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong!',
                });
            }
        })
    }

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
                <table className='w-full border-collapse bg-white p-3 border border-black/30 text-xs overflow-x-auto'>
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
                        {
                            !isLoading && products?.length > 0 && products?.map((product: any) => (
                                <tr key={product.id} className='bg-[#F6F7F7] border-b border-b-black/50'>
                                    <td className='p-2 text-center'>
                                        <Image src={product?.images[0]?.url} alt='product' width={50} height={50} className='w-[50px] h-[50px] object-cover mx-auto' />
                                    </td>
                                    <td className='p-2 text-left capitalize'>
                                        {product?.name}
                                    </td>
                                    <td className='p-2 text-left'>
                                        {product?.sku}
                                    </td>
                                    <td className='p-2 text-left'>
                                        {product?.stockStatus}
                                    </td>
                                    <td className='p-2 text-left'>
                                        {product?.price}
                                    </td>
                                    <td className='p-2 text-left'>
                                        {product?.categories?.map((category: any) => category?.name).join(', ')}
                                    </td>
                                    <td className='p-2 text-left'>
                                        {product?.tags?.map((tag: any) => tag?.name).join(', ')}
                                    </td>
                                    <td className='p-2 text-left'>
                                        {product?.productBrand?.name}
                                    </td>
                                    <td className='p-2 text-left'>
                                        {product?.featured ? 'Yes' : 'No'}
                                    </td>
                                    <td className='p-2 text-left'>
                                        {product?.createdAt ? new Date(product.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                                    </td>
                                    <td className='p-2 text-center'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <Edit className='w-4 h-4 cursor-pointer hover:text-primary transition-all duration-200' />
                                            <Trash onClick={() => handleDelete(product.id)} className='w-4 h-4 cursor-pointer hover:text-primary transition-all duration-200' />
                                            <Eye className='w-4 h-4 cursor-pointer hover:text-primary transition-all duration-200' />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

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