'use client'
import PopUp from '@/Shared/PopUp/PopUp';
import { Edit, Trash, X } from 'lucide-react';
import React, { useState } from 'react'

const AttributesPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            <div className='flex flex-col gap-4'>
                <span className='text-2xl font-semibold'>
                    Product Attributes
                </span>
                <div className='flex flex-row items-start justify-between gap-6'>
                    <div className='w-[30%] flex flex-col gap-4'>
                        <form className='flex flex-col gap-4'>
                            <h4 className='text-lg font-semibold'>Add new attribute</h4>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='attribute-name' className='text-sm font-medium'>Attribute name</label>
                                <input type='text' id='attribute-name' placeholder='Attribute name' className='border border-black/30 rounded-sm p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='attribute-type' className='text-sm font-medium'>Attribute type</label>
                                <select id='attribute-type' className='border border-black/30 rounded-sm p-2' required>
                                    <option value=''>Select a attribute type</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='attribute-slug' className='text-sm font-medium'>Slug</label>
                                <input type='text' id='attribute-slug' placeholder='Slug' className='border border-black/30 rounded-sm p-2' />
                            </div>
                            <button type='submit' className='bg-primary text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-primary/80 transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2'>Add new category</button>
                        </form>
                    </div>
                    <div className='w-[70%] bg-blue-400'>
                        <table className='w-full border-collapse bg-white p-3 border border-black/30 text-xs overflow-x-auto'>
                            <thead className='bg-[#FAFAFA] border-b border-b-black/50'>
                                <tr className='text-left'>
                                    <th className='p-2 text-left'>
                                        Name
                                    </th>
                                    <th className='p-2'>
                                        Slug
                                    </th>
                                    <th className='p-2'>
                                        Count
                                    </th>
                                    <th className='p-2'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='bg-[#F6F7F7] border-b border-b-black/50'>
                                    <td className='p-2 text-left'>
                                        Color
                                    </td>
                                    <td className='p-2 text-left'>
                                        color
                                    </td>
                                    <td className='p-2 text-left'>
                                        10
                                    </td>
                                    <td className='p-2 text-center'>
                                        <div className='flex items-center gap-2'>
                                            <Edit onClick={() => setIsOpen(true)} className='w-4 h-4 cursor-pointer hover:text-primary transition-all duration-200' />
                                            <Trash className='w-4 h-4 cursor-pointer hover:text-primary transition-all duration-200' />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className='text-left'>
                                    <th className='p-2 text-left'>
                                        Name
                                    </th>
                                    <th className='p-2'>
                                        Slug
                                    </th>
                                    <th className='p-2'>
                                        Count
                                    </th>
                                    <th className='p-2'>
                                        Actions
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            {/* Edit Attribute PopUp */}
            <PopUp fn={setIsOpen} isOpen={isOpen} >
                <div className='w-full h-full relative flex items-center justify-center'>
                    <div className='absolute top-5 right-5 z-10 rounded-full border border-black text-black p-1 cursor-pointer'>
                        <X className='w-5 h-5' onClick={() => setIsOpen(false)} />
                    </div>
                    <div onClick={(e) => e.stopPropagation()} className='h-[80%] max-w-1/2 w-full bg-white rounded-sm p-4'>
                        <span className='text-2xl font-semibold'>
                            Product Attributes
                        </span>
                        <div className='flex flex-col gap-4'>
                            <form className='flex flex-col gap-4'>
                                <h4 className='text-lg font-semibold'>Add new attribute</h4>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='attribute-name' className='text-sm font-medium'>Attribute name</label>
                                    <input type='text' id='attribute-name' placeholder='Attribute name' className='border border-black/30 rounded-sm p-2' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='attribute-type' className='text-sm font-medium'>Attribute type</label>
                                    <select id='attribute-type' className='border border-black/30 rounded-sm p-2' required>
                                        <option value=''>Select a attribute type</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='attribute-slug' className='text-sm font-medium'>Slug</label>
                                    <input type='text' id='attribute-slug' placeholder='Slug' className='border border-black/30 rounded-sm p-2' />
                                </div>
                                <button type='submit' className='bg-primary text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-primary/80 transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2'>Add new attribute</button>
                            </form>
                        </div>
                    </div>
                </div>
            </PopUp>
        </>
    )
}
export default AttributesPage;