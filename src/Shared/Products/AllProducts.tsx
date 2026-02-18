"use client"
import React, { useEffect, useMemo, useState, useRef } from 'react'
import ProductCard from '../Card/ProductCard'
import ReactRangeSliderInput from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ProductLoader from '@/app/(Main)/Loader/ProductLoader';
import PopUp from '../PopUp/PopUp';
import { X } from 'lucide-react';

const AllProducts = () => {
    const params = useParams();
    const category = params.slug;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const url = category ? `/api/category/${category}` : '/api/product';

    const { data: categoryProducts, isLoading } = useQuery({
        queryKey: ['categoryProducts', category],
        queryFn: async () => {
            const response = await fetch(url);
            const data = await response.json();
            return category ? data.category?.products : data.products;
        },
        staleTime: 60 * 60 * 1000, // Cache for 1 hour
    })

    // Fetch current category with children when category exists
    const { data: currentCategory } = useQuery({
        queryKey: ['currentCategory', category],
        queryFn: async () => {
            if (!category) return null;
            const response = await fetch(`/api/category/${category}`);
            const data = await response.json();
            return data.category ?? null;
        },
        enabled: !!category,
        staleTime: 60 * 60 * 1000, // Cache for 1 hour
    })

    const { data: allCategories = [], isLoading: isCategoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await fetch('/api/category');
            const data = await response.json();
            return data.categories ?? [];
        },
        staleTime: 60 * 60 * 1000, // Cache for 1 hour
    })

    // Filter categories to show only children of current category if category exists
    const categories = useMemo(() => {
        if (!category || !currentCategory) {
            return allCategories;
        }
        
        // If current category has children, return them directly
        if (currentCategory.children && currentCategory.children.length > 0) {
            return currentCategory.children;
        }
        
        // Otherwise, find children in the allCategories tree
        const findCategoryChildren = (cats: typeof allCategories, targetId: string): typeof allCategories => {
            for (const cat of cats) {
                if (cat.id === targetId) {
                    return cat.children || [];
                }
                if (cat.children && cat.children.length > 0) {
                    const found = findCategoryChildren(cat.children, targetId);
                    if (found.length > 0) {
                        return found;
                    }
                }
            }
            return [];
        };
        
        return findCategoryChildren(allCategories, currentCategory.id);
    }, [category, currentCategory, allCategories])

    const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
    const priceRangeInitialized = useRef(false);

    const { minPrice, maxPrice } = useMemo(() => {
        if (!categoryProducts || categoryProducts.length === 0) {
            return { minPrice: 0, maxPrice: 0 };
        }

        const prices = categoryProducts.map((p: { price: number }) => Number(p?.price));
        return {
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices)
        };
    }, [categoryProducts]);

    useEffect(() => {
        if (minPrice > 0 && maxPrice > 0 && !priceRangeInitialized.current) {
            priceRangeInitialized.current = true;
            // Initialize price range from product data - necessary for syncing external data
            setPriceRange([minPrice, maxPrice]);
        }
    }, [minPrice, maxPrice]);

    // Reset filters when category changes - necessary for syncing with URL params
    useEffect(() => {
        setSelectedCategories([]);
        priceRangeInitialized.current = false;
    }, [category]);

    const filteredProducts = useMemo(() => {
        if (!categoryProducts) return [];

        const [min, max] = priceRange;
        return categoryProducts.filter((product: { 
            price: number; 
            categoryIds?: string[];
            categories?: Array<{ id: string }>;
        }) => {
            const price = Number(product?.price);
            const priceMatch = price >= min && price <= max;
            
            // If no categories selected, show all products (respecting price filter)
            if (selectedCategories.length === 0) {
                return priceMatch;
            }
            
            // Get category IDs from either categoryIds array or categories objects
            const productCategoryIds = product.categoryIds ?? 
                (product.categories?.map((cat: { id: string }) => cat.id) ?? []);
            
            // Check if product belongs to any selected category
            const categoryMatch = productCategoryIds.some((catId: string) => 
                selectedCategories.includes(catId)
            );
            
            return priceMatch && categoryMatch;
        });
    }, [categoryProducts, priceRange, selectedCategories]);


    const handleChange = (val: [number, number]) => {
        setPriceRange(val);
    }

    const handleCategoryToggle = (categoryId: string) => {
        setSelectedCategories((prev) => {
            if (prev.includes(categoryId)) {
                return prev.filter((id) => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    }

    const renderCategories = (categoriesList: typeof categories, level: number = 0) => {
        return (
            <ul className={`space-y-3 ${level > 0 ? 'ml-6' : ''}`}>
                {categoriesList.map((cat: { id: string; name: string; slug: string; children?: typeof categories }) => (
                    <li key={cat.id} className="flex flex-col">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="peer w-3 h-3 cursor-pointer accent-black"
                                checked={selectedCategories.includes(cat.id)}
                                onChange={() => handleCategoryToggle(cat.id)}
                            />
                            <span className="text-[#999] font-semibold text-[14px] leading-[16px] uppercase peer-checked:text-[#111111bf]">
                                {cat.name}
                            </span>
                        </label>
                        {Array.isArray(cat.children) && cat.children.length > 0 && (
                            <div className="mt-3">
                                {renderCategories(cat.children, level + 1)}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };


    if (categoryProducts && categoryProducts.length === 0) return <div>No products found</div>


    return (
        <>
            <div className='w-full flex md:flex-row flex-col items-start justify-between gap-10'>
                <div className='text-lg leading-[15px] font-semibold text-black pb-1 global-b-bottom w-full md:hidden block' onClick={() => setIsOpen(!isOpen)}>Filter</div>
                <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 items-start md:w-3/4 w-full gap-6'>
                    {
                        isLoading ?
                            Array.from({ length: 12 }).map((_, index) => (
                                <ProductLoader key={index} />
                            ))
                            :
                            filteredProducts && filteredProducts.length > 0 ? filteredProducts.map((product: { id: string, images: { url: string }[], name: string, price: number, regularPrice: number, salePrice: number, slug: string }) => (
                                <ProductCard key={product.id} product={product} />
                            )): 
                            <div className=''>No products found</div>
                    }
                </div>
                <div className='sticky top-[80px] w-1/4 hidden flex-col gap-10 md:flex '>
                    {
                        categoryProducts && categoryProducts.length > 1 && (
                            <div>
                                <h3 className='filter-heading'>Filter By Price</h3>
                                <ReactRangeSliderInput min={minPrice}
                                    max={maxPrice}
                                    value={priceRange}
                                    onInput={handleChange}
                                    className='my-dashed-slider'
                                />
                                <div className='text-[14px] leading-[15px] font-semibold mt-4'>
                                    د.إ {priceRange[1].toFixed(2)} — د.إ {priceRange[0].toFixed(2)}
                                </div>
                            </div>
                        )
                    }
                    <div>
                        <h3 className='filter-heading'>Filter By Category</h3>
                        {isCategoriesLoading ? (
                            <div className='text-sm text-gray-500 mt-4'>Loading categories...</div>
                        ) : categories.length > 0 ? (
                            <div className='mt-4'>
                                {renderCategories(categories)}
                            </div>
                        ) : (
                            <div className='text-sm text-gray-500 mt-4'>No categories available</div>
                        )}
                    </div>
                </div>
            </div>
            <PopUp isOpen={isOpen} fn={setIsOpen}>
                <div className='w-full h-full flex items-center justify-center'>
                    <div className='w-[90%] h-[80vh] bg-white rounded-sm p-4 relative' onClick={(e) => e.stopPropagation()}>
                        <button type='button' title='Close' onClick={() => setIsOpen(false)} className='absolute top-4 right-4 border rounded-full p-1 cursor-pointer'>
                            <X className='w-4 h-4' />
                        </button>
                        <div className='pt-10 h-full flex flex-col justify-between gap-6'>
                            <div className='h-[75%] overflow-y-auto scroll-bar'>
                                <h3 className='filter-heading global-b-bottom mb-4'>Filter By Category</h3>
                                {isCategoriesLoading ? (
                                    <div className='text-sm text-gray-500'>Loading categories...</div>
                                ) : categories.length > 0 ? (
                                    renderCategories(categories)
                                ) : (
                                    <div className='text-sm text-gray-500'>No categories available</div>
                                )}
                            </div>
                            <div className='h-[25%]'>
                                <h3 className='filter-heading'>Filter By Price</h3>
                                <ReactRangeSliderInput min={minPrice}
                                    max={maxPrice}
                                    value={priceRange}
                                    onInput={handleChange}
                                    className='my-dashed-slider'
                                />
                                <div className='text-[14px] leading-[15px] font-semibold mt-4'>
                                    د.إ {priceRange[1].toFixed(2)} — د.إ {priceRange[0].toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PopUp>
        </>
    )
}

export default AllProducts