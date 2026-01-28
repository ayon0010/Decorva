'use client'
import Advanced from '@/Components/Dashboard/Products/Advanced';
import Attributes from '@/Components/Dashboard/Products/Attributes';
import General from '@/Components/Dashboard/Products/General';
import Inventory from '@/Components/Dashboard/Products/Inventory';
import LinkedProducts from '@/Components/Dashboard/Products/LinkedProducts';
import ProductBrand from '@/Components/Dashboard/Products/ProductBrand';
import ProductCategories from '@/Components/Dashboard/Products/ProductCategories';
import ProductDescription from '@/Components/Dashboard/Products/ProductDescription';
import ProductFeatureImage from '@/Components/Dashboard/Products/ProductFeatureImage';
import ProductGallery from '@/Components/Dashboard/Products/ProductGallery';
import ProductTags from '@/Components/Dashboard/Products/ProductTags';
import Shipping from '@/Components/Dashboard/Products/Shipping';
import { Box, Link, Settings, ShieldCheck, Tag, Truck } from 'lucide-react';
import React, { useState } from 'react'

const AddProductPage = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    return (
        <section className=''>
            <h2 className='text-2xl mb-4'>Add new product</h2>
            <div className='w-full flex items-start justify-between gap-6'>
                <aside className='w-3/4 flex flex-col gap-4'>
                    <input type="text" placeholder='Product name' className='w-full p-2 border border-black/30 rounded-sm' />
                    <ProductDescription />
                    <div className='border border-black/30'>
                        <div className='flex items-center border-b border-black/30 gap-2 py-2 px-3'>
                            <h3>Product Data -</h3>
                            <select
                                className="border border-black/30 rounded-sm text-base py-1"
                                title="Product Data"
                            >
                                <option value="simple">Simple Product</option>
                                <option value="variable">Variable Product</option>
                                <option value="grouped">Grouped Product</option>
                                <option value="external">External Product</option>
                                <option value="downloadable">Downloadable Product</option>
                            </select>
                        </div>
                        <div className='flex items-stretch justify-between'>
                            <div className='w-[30%] border-r border-black/30 bg-[#FAFAFA]'>
                                <div className={`flex items-center pl-2 py-2 gap-1 border-b border-black/30 cursor-pointer ${activeTab === 0 ? 'bg-[#EEEEEE] text-black/80' : 'bg-[#FAFAFA] text-primary'}`} onClick={() => setActiveTab(0)}>
                                    <Settings className='w-3 h-3' />
                                    <span>General</span>
                                </div>
                                <div className={`flex items-center pl-2 py-2 gap-1 border-b border-black/30 cursor-pointer ${activeTab === 1 ? 'bg-[#EEEEEE] text-black/80' : 'bg-[#FAFAFA] text-primary'}`} onClick={() => setActiveTab(1)}>
                                    <Box className='w-3 h-3' />
                                    <span>Inventory</span>
                                </div>
                                <div className={`flex items-center pl-2 py-2 gap-1 border-b border-black/30 cursor-pointer ${activeTab === 2 ? 'bg-[#EEEEEE] text-black/80' : 'bg-[#FAFAFA] text-primary'}`} onClick={() => setActiveTab(2)}>
                                    <Truck className='w-3 h-3' />
                                    <span>Shipping</span>
                                </div>
                                <div className={`flex items-center pl-2 py-2 gap-1 border-b border-black/30 cursor-pointer ${activeTab === 3 ? 'bg-[#EEEEEE] text-black/80' : 'bg-[#FAFAFA] text-primary'}`} onClick={() => setActiveTab(3)}>
                                    <Link className='w-3 h-3' />
                                    <span>Linked Products</span>
                                </div>
                                <div className={`flex items-center pl-2 py-2 gap-1 border-b border-black/30 cursor-pointer ${activeTab === 4 ? 'bg-[#EEEEEE] text-black/80' : 'bg-[#FAFAFA] text-primary'}`} onClick={() => setActiveTab(4)}>
                                    <Tag className='w-3 h-3' />
                                    <span>Attributes</span>
                                </div>
                                <div className={`flex items-center pl-2 py-2 gap-1 cursor-pointer ${activeTab === 5 ? 'bg-[#EEEEEE] text-black/80' : 'bg-[#FAFAFA] text-primary'}`} onClick={() => setActiveTab(5)}>
                                    <ShieldCheck className='w-3 h-3' />
                                    <span>Advanced</span>
                                </div>
                            </div>
                            <div className='w-[70%] pl-2'>
                                {
                                    activeTab === 0 && <>
                                        <General />
                                    </>
                                }
                                {
                                    activeTab === 1 && <>
                                        <Inventory />
                                    </>
                                }
                                {
                                    activeTab === 2 && <>
                                        <Shipping />
                                    </>
                                }
                                {
                                    activeTab === 3 && <>
                                        <LinkedProducts />
                                    </>
                                }
                                {
                                    activeTab === 4 && <>
                                        <Attributes />
                                    </>
                                }
                                {
                                    activeTab === 5 && <>
                                        <Advanced />
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </aside>
                <aside className='w-1/4 flex flex-col gap-4'>
                    <div className='bg-white p-3 flex flex-col gap-2 border border-black/30'>
                        <div className='text-base border-b border-b-black/30 pb-2'>
                            Publish
                        </div>
                        <button type='button' className='border border-primary bg-white text-primary hover:bg-primary hover:text-white transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 cursor-pointer px-4 py-2 rounded-sm text-xs w-fit mt-1 ml-auto'>
                            Publish
                        </button>
                    </div>
                    <ProductFeatureImage />
                    <ProductGallery />
                    <ProductCategories />
                    <ProductTags />
                    <ProductBrand />
                </aside>
            </div>
        </section>
    )
}

export default AddProductPage;