"use client"
import React, { useMemo, useState } from 'react'
import { lora } from '../font/Rubik';
import ProductCard from '../Card/ProductCard';
import { useQuery } from '@tanstack/react-query';
import ProductLoader from '@/app/(Main)/Loader/ProductLoader';

const Products = () => {

    const [active, setActive] = useState(0);

    const { data: plantStands = [], isLoading: isPlantStandsLoading } = useQuery({
        queryKey: ['plantStands', 'plant-stands-&-movers'],
        queryFn: async () => {
            const response = await fetch(`/api/category/plant-stands-&-movers`);
            const data = await response.json();
            return data.category?.products;
        }
    })

    const { data: plantFamilies = [], isLoading: isPlantFamiliesLoading } = useQuery({
        queryKey: ['plantFamilies', 'plant-families'],
        queryFn: async () => {
            const response = await fetch(`/api/category/plant-families`);
            const data = await response.json();
            return data.category?.products;
        }
    })

    const { data: outdoorPlantPots = [], isLoading: isOutdoorPlantPotsLoading } = useQuery({
        queryKey: ['outdoorPlantPots', 'outdoor-plant-pots'],
        queryFn: async () => {
            const response = await fetch(`/api/category/outdoor-plant-pots`);
            const data = await response.json();
            return data.category?.products;
        }
    })

    const products = useMemo(() => {
        if (active === 0) return plantStands;
        if (active === 1) return plantFamilies;
        if (active === 2) return outdoorPlantPots;
        return [];
    }, [active, plantStands, plantFamilies, outdoorPlantPots]);


    return (
        <div className="global-padding layout mt-10">
            <ul className='items-center justify-center gap-10 flex-wrap hidden md:flex'>
                <li className={`uppercase text-sm leading-[24px] border-b-2 font-normal hover:text-primary transition-all duration-300 cursor-pointer ${lora.className} ${active === 0 ? "border-b-primary text-primary" : "text-black border-b-transparent hover:border-b-primary"}`} onClick={() => setActive(0)}>Plant Stands & Movers</li>
                <li className={`uppercase text-sm leading-[24px] border-b-2 font-normal hover:text-primary transition-all duration-300 cursor-pointer ${lora.className} ${active === 1 ? "border-b-primary text-primary" : "text-black border-b-transparent hover:border-b-primary"}`} onClick={() => setActive(1)}>Plant Families</li>
                <li className={`uppercase text-sm leading-[24px] border-b-2 font-normal hover:text-primary transition-all duration-300 cursor-pointer ${lora.className} ${active === 2 ? "border-b-primary text-primary" : "text-black border-b-transparent hover:border-b-primary"}`} onClick={() => setActive(2)}>Outdoor Plant Pots</li>
            </ul>
            <div className='mt-6 md:grid 2xl:grid-cols-5 lg:grid-cols-4 grid-cols-2 items-start w-full gap-6 hidden'>
                {
                    isPlantStandsLoading || isPlantFamiliesLoading || isOutdoorPlantPotsLoading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <ProductLoader key={index} />
                        ))
                    ) : (
                        products && products.length > 0 && products.slice(0, 8).map((product: { id: string, images: { url: string }[], name: string, price: number, regularPrice: number, salePrice: number, slug: string }) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )
                }
            </div>
            <div className='mt-6 md:hidden block flex flex-col gap-6'>
                <div>
                    <h3 className='text-lg leading-[15px] font-semibold text-black pb-3 global-b-bottom my-6'>Plant Stands & Movers</h3>
                    <div className='grid grid-cols-2 gap-4'>
                        {
                            isPlantStandsLoading ? (
                                Array.from({ length: 8 }).map((_, index) => (
                                    <ProductLoader key={index} />
                                ))
                            ) : (
                                plantStands && plantStands.length > 0 && plantStands.slice(0, 8).map((product: { id: string, images: { url: string }[], name: string, price: number, regularPrice: number, salePrice: number, slug: string }) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            )
                        }
                    </div>
                </div>
                <div>
                    <h3 className='text-lg leading-[15px] font-semibold text-black pb-3 global-b-bottom my-6'>Plant Families</h3>
                    <div className='grid grid-cols-2 gap-4'>
                        {
                            isPlantFamiliesLoading ? (
                                Array.from({ length: 8 }).map((_, index) => (
                                    <ProductLoader key={index} />
                                ))
                            ) : (
                                plantFamilies && plantFamilies.length > 0 && plantFamilies.slice(0, 8).map((product: { id: string, images: { url: string }[], name: string, price: number, regularPrice: number, salePrice: number, slug: string }) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            )
                        }
                    </div>
                </div>
                <div>
                    <h3 className='text-lg leading-[15px] font-semibold text-black pb-3 global-b-bottom my-6'>Outdoor Plant Pots</h3>
                    <div className='grid grid-cols-2 gap-4'>
                        {
                            isOutdoorPlantPotsLoading ? (
                                Array.from({ length: 8 }).map((_, index) => (
                                    <ProductLoader key={index} />
                                ))
                            ) : (
                                outdoorPlantPots && outdoorPlantPots.length > 0 && outdoorPlantPots.slice(0, 8).map((product: { id: string, images: { url: string }[], name: string, price: number, regularPrice: number, salePrice: number, slug: string }) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;