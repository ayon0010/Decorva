// "use client"

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Search, X } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';
// // import { getRecentProducts, searchProducts } from '../funtions/getWooCommerce';
// // import useGetData from '../funtions/ClientFetch/GetData';
// import { useRef, useState, useEffect } from 'react';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import { useForm } from 'react-hook-form';
// // import { getRecentProducts, searchProducts } from '@/app/actions/Woo-Coommerce/getWooCommerce';
// // import useGetData from "../../Shared/FetchFn/getData"
// const SEARCH_HISTORY_KEY = 'search_history';
// const MAX_HISTORY_ITEMS = 10;




// const SearchOverlay = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {

//     // React Hook Form
//     const { register, handleSubmit, watch, reset, setValue } = useForm();
//     const searchValue = watch('search', '');


//     // const { isLoading, isError, error, data, refetch } = useGetData('recent-products', getRecentProducts);

//     const [products, setProducts] = useState([]);
//     const [isSearching, setIsSearching] = useState(false);

//     // // Initialize products with recent products when data is loaded
//     // useEffect(() => {
//     //     if (data && Array.isArray(data) && data.length > 0 && (!searchValue || searchValue.trim().length === 0)) {
//     //         setProducts(data);
//     //     }
//     // }, [data, searchValue]);

//     // Handle search when user types
//     useEffect(() => {
//         // If search is empty, show recent products
//         if (!searchValue || searchValue.trim().length === 0) {
//             if (data && Array.isArray(data)) {
//                 setProducts(data);
//             }
//             return;
//         }

//         // Debounce search
//         const timeoutId = setTimeout(async () => {
//             setIsSearching(true);
//             try {
//                 const results = await searchProducts(searchValue);
//                 // Filter products that start with the search term (case-insensitive)
//                 const searchLower = searchValue.toLowerCase().trim();
//                 const matched = Array.isArray(results)
//                     ? results.filter((product) =>
//                         product?.name?.toLowerCase().startsWith(searchLower)
//                     )
//                     : [];
//                 setProducts(matched);
//             } catch (err) {
//                 console.error('Search error:', err);
//                 setProducts([]);
//             } finally {
//                 setIsSearching(false);
//             }
//         }, 300);

//         return () => clearTimeout(timeoutId);
//     }, [searchValue, data])


//     // Lock body scroll when overlay is open
//     useEffect(() => {
//         if (isOpen) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = '';
//         }
//         return () => {
//             document.body.style.overflow = '';
//         };
//     }, [isOpen]);

//     // Search history state
//     const [searchHistory, setSearchHistory] = useState([]);

//     // Load history from localStorage on mount
//     useEffect(() => {
//         const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
//         if (stored) {
//             setSearchHistory(JSON.parse(stored));
//         }
//     }, []);

//     // Save to history when user submits
//     const onSubmit = (data) => {
//         const term = data.search?.trim();
//         if (!term) return;

//         const newHistory = [term, ...searchHistory.filter(h => h !== term)].slice(0, MAX_HISTORY_ITEMS);
//         setSearchHistory(newHistory);
//         localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));

//         // TODO: handle search navigation
//         reset();
//     };

//     // Remove single item from history
//     const removeFromHistory = (term) => {
//         const newHistory = searchHistory.filter(h => h !== term);
//         setSearchHistory(newHistory);
//         localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
//     };

//     // Clear all history
//     const clearHistory = () => {
//         setSearchHistory([]);
//         localStorage.removeItem(SEARCH_HISTORY_KEY);
//     };



//     const searchRef = useRef(null);
//     useGSAP(() => {
//         if (!searchRef.current) return;
//         const ctx = gsap.context(() => {
//             gsap.to(searchRef.current, {
//                 clipPath: isOpen
//                     ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
//                     : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
//                 duration: 0.5,
//                 ease: "power2.inOut"
//             })
//         })
//         return () => ctx.revert();
//     }, { dependencies: [isOpen], revertOnUpdate: true })


//     return (
//         <div className={`fixed top-0 left-0 right-0 w-full h-full bg-black/50 backdrop-blur-md z-[998] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>

//             <div className="bg-white lg:h-auto h-screen overflow-y-scroll p-6 space-y-6" ref={searchRef} style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}>
//                 <div className="flex items-center justify-between gap-[10px]">
//                     <button onClick={onClose} className="flex items-center gap-2 text-[#111] text-sm cursor-pointer">
//                         <X className="w-4 h-4" /> Close
//                     </button>
//                     <form className="flex-[1_0_0] w-full relative" onSubmit={handleSubmit(onSubmit)}>
//                         <input
//                             type="text"
//                             placeholder="Search for..."
//                             className="px-4 py-2 flex-[1_0_0] w-full focus:outline-none border-b-2 border-b-[#1D98FF] pl-10"
//                             {...register('search')}
//                         />
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#111]" />
//                     </form>
//                 </div>
//                 {/* Search History */}
//                 {searchHistory.length > 0 && (
//                     <div className="flex flex-wrap items-center gap-4">
//                         <span>Latest searches :</span>
//                         {searchHistory.map((term, index) => (
//                             <div onClick={() => setValue('search', term)} key={index} className="flex items-center gap-1 justify-center cursor-pointer bg-[#f7F7F7] rounded-sm text-sm w-fit py-1 px-2">
//                                 <span>{term}</span>
//                                 <button type="button" onClick={() => removeFromHistory(term)}>
//                                     <X className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         ))}
//                         <button type="button" onClick={clearHistory} className="text-[#1D98FF] font-semibold text-sm cursor-pointer">
//                             Delete all
//                         </button>
//                     </div>
//                 )}
//                 {/* Products */}
//                 <div className='space-y-4'>
//                     <h2 className="text-[#111] text-sm font-semibold">Recommended products</h2>

//                     <div className='lg:hidden block grid grid-cols-2 gap-4'>
//                         {
//                             products && products.length > 0 ? (
//                                 products.map((product) => {
//                                     const image = product?.images?.[0]?.src || '/images/placeholder.png';
//                                     const name = product?.name || '';
//                                     const price = product?.price || product?.regular_price || '0';
//                                     const priceHtml = product?.price_html || '';
//                                     const slug = product?.slug || '';

//                                     return (
//                                         <div key={product.id} className='h-auto! w-full'>
//                                             <Link onClick={onClose} className='h-full p-5 flex flex-col justify-between gap-6 bg-[#f7F7F7] rounded-sm' href={`/product/${slug}`}>
//                                                 <div className='flex flex-col gap-[10px] text-center'>
//                                                     <Image src={image} width={100} height={100} alt={name} className='w-full h-full aspect-[1] object-contain' />
//                                                     <font className='text-[#111] text-lg uppercase leading-[100%] font-bold'>{name}</font>
//                                                 </div>
//                                                 {priceHtml ? (
//                                                     <div className='text-[#111] text-sm leading-[100%] text-center' dangerouslySetInnerHTML={{ __html: priceHtml }} />
//                                                 ) : (
//                                                     <font className='text-[#111] text-sm leading-[100%] text-center'>{price}€</font>
//                                                 )}
//                                             </Link>
//                                         </div>
//                                     )
//                                 })
//                             ) : (
//                                 !isSearching && (
//                                     <div className='text-center py-8 text-[#111] text-sm'>
//                                         {isLoading ? 'Chargement...' : 'Aucun produit trouvé'}
//                                     </div>
//                                 )
//                             )
//                         }
//                     </div>

//                     <div className='lg:block hidden'>
//                         <Swiper
//                             modules={[Navigation]}
//                             spaceBetween={"16px"}
//                             slidesPerView={"auto"}
//                             loop={false}
//                             navigation={true}
//                             grabCursor={true}
//                             className={`${isSearching ? 'opacity-70' : 'opacity-100'} search-swiper items-stretch!`}
//                         >
//                             {
//                                 products && products.length > 0 ? (
//                                     products.map((product) => {
//                                         const image = product?.images?.[0]?.src || '/images/placeholder.png';
//                                         const name = product?.name || '';
//                                         const price = product?.price || product?.regular_price || '0';
//                                         const priceHtml = product?.price_html || '';
//                                         const slug = product?.slug || '';

//                                         return (
//                                             <SwiperSlide key={product.id} className='h-auto! max-w-[240px] w-full'>
//                                                 <Link onClick={onClose} className='h-full p-5 flex flex-col justify-between gap-6 bg-[#f7F7F7] rounded-sm' href={`/product/${slug}`}>
//                                                     <div className='flex flex-col gap-[10px] text-center'>
//                                                         <Image src={image} width={100} height={100} alt={name} className='w-full h-full aspect-[1] object-contain' />
//                                                         <font className='text-[#111] text-lg uppercase leading-[100%] font-bold'>{name}</font>
//                                                     </div>
//                                                     {priceHtml ? (
//                                                         <div className='text-[#111] text-sm leading-[100%] text-center' dangerouslySetInnerHTML={{ __html: priceHtml }} />
//                                                     ) : (
//                                                         <font className='text-[#111] text-sm leading-[100%] text-center'>{price}€</font>
//                                                     )}
//                                                 </Link>
//                                             </SwiperSlide>
//                                         )
//                                     })
//                                 ) : (
//                                     !isSearching && (
//                                         <div className='text-center py-8 text-[#111] text-sm'>
//                                             {isLoading ? 'Chargement...' : 'Aucun produit trouvé'}
//                                         </div>
//                                     )
//                                 )
//                             }
//                         </Swiper>
//                     </div>
//                 </div>
//             </div>

//         </div >
//     )
// }

// export default SearchOverlay;

"use client"

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Search as SearchIcon, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FieldValues, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

const SEARCH_HISTORY_KEY = 'search_history';
const MAX_HISTORY_ITEMS = 10;
const DEBOUNCE_MS = 300;

type ProductItem = {
    id: string;
    images: { url: string }[];
    name: string;
    price: number;
    regularPrice: number;
    salePrice: number;
    slug: string;
};

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

function loadSearchHistory(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveSearchHistory(history: string[]) {
    try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    } catch {
        // ignore
    }
}

const Search = ({ isOpen, setIsSearchOpen }: { isOpen: boolean, setIsSearchOpen: (isOpen: boolean) => void }) => {
    const { register, handleSubmit, watch, setValue } = useForm();
    const searchValue = watch('search', '') as string;
    const debouncedSearch = useDebounce(searchValue?.trim() ?? '', DEBOUNCE_MS);

    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    useEffect(() => {
        setSearchHistory(loadSearchHistory());
    }, []);

    const addToHistory = useCallback((term: string) => {
        const trimmed = term?.trim();
        if (!trimmed) return;
        setSearchHistory((prev) => {
            const newHistory = [trimmed, ...prev.filter((h) => h.toLowerCase() !== trimmed.toLowerCase())].slice(0, MAX_HISTORY_ITEMS);
            saveSearchHistory(newHistory);
            return newHistory;
        });
    }, []);

    const removeFromHistory = useCallback((term: string) => {
        setSearchHistory((prev) => {
            const newHistory = prev.filter((h) => h !== term);
            saveSearchHistory(newHistory);
            return newHistory;
        });
    }, []);

    const clearHistory = useCallback(() => {
        setSearchHistory([]);
        saveSearchHistory([]);
    }, []);

    const searchRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        if (!searchRef.current) return;
        const ctx = gsap.context(() => {
            gsap.to(searchRef.current, {
                clipPath: isOpen
                    ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                    : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 0.5,
                ease: "power2.inOut"
            })
        })
        return () => ctx.revert();
    }, { dependencies: [isOpen] })

    const { data: searchResults, isLoading: isSearching } = useQuery({
        queryKey: ['searchProducts', debouncedSearch],
        queryFn: async () => {
            const res = await fetch(`/api/product?q=${encodeURIComponent(debouncedSearch)}`);
            const data = await res.json();
            return data.products as ProductItem[];
        },
        enabled: debouncedSearch.length > 0,
    });

    const { data: recentProducts, isLoading: isLoadingRecentProducts } = useQuery({
        queryKey: ['recentProducts'],
        queryFn: async () => {
            const res = await fetch('/api/product?recent=true&limit=20');
            const data = await res.json();
            return data.products as ProductItem[];
        },
        enabled: debouncedSearch.length === 0,
    });

    const products = debouncedSearch.length > 0 ? (searchResults ?? []) : (recentProducts ?? []);
    const isLoading = debouncedSearch.length > 0 ? isSearching : isLoadingRecentProducts;

    const onSubmit = (data: FieldValues) => {
        const term = (data.search as string)?.trim();
        if (!term) return;
        addToHistory(term);
        setValue('search', term);
    };

    const onHistoryClick = (term: string) => {
        setValue('search', term);
    };

    const renderProductCard = (product: ProductItem) => {
        const imageUrl = product?.images?.[0]?.url || '/product7.webp';
        const price = product?.salePrice ?? product?.regularPrice ?? product?.price ?? 0;
        return (
            <Link
                key={product.id}
                onClick={() => setIsSearchOpen(false)}
                href={`/product/${product.slug}`}
                className="h-full p-3 flex flex-col justify-between gap-6 bg-[#f7F7F7] rounded-sm"
            >
                <div className="flex flex-col gap-[10px] text-center">
                    <Image src={imageUrl} width={100} height={100} alt={product.name} className="w-full h-full aspect-[1] object-contain rounded-sm" />
                    <span className="text-[#111] text-lg uppercase leading-[100%] font-bold line-clamp-2">{product.name}</span>
                </div>
                <span className="text-[#111] text-sm leading-[100%] text-center">{price} AED</span>
            </Link>
        );
    };

    return (
        <div className={`fixed top-0 left-0 right-0 w-full h-full bg-black/50 backdrop-blur-md z-[998] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsSearchOpen(false)}>
            <div ref={searchRef} className="bg-white lg:h-auto h-screen overflow-y-scroll p-6 space-y-6" style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0, 0 0)" }} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between gap-[10px]">
                    <button onClick={() => setIsSearchOpen(false)} className="flex items-center gap-2 text-[#111] text-sm cursor-pointer" aria-label="Close search">
                        <X className="w-4 h-4" /> Close
                    </button>
                    <form className="flex-[1_0_0] w-full relative" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            placeholder="Search for..."
                            className="px-4 py-2 flex-[1_0_0] w-full focus:outline-none border-b-2 border-b-[#1D98FF] pl-10"
                            {...register('search')}
                        />
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#111]" />
                    </form>
                </div>

                {/* Search History */}
                {searchHistory.length > 0 && (
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[#111] text-sm">Latest searches:</span>
                        {searchHistory.map((term, index) => (
                            <div
                                key={`${term}-${index}`}
                                className="flex items-center gap-1 justify-center cursor-pointer bg-[#f7F7F7] rounded-sm text-sm w-fit py-1.5 px-2.5 hover:bg-[#eee] transition-colors"
                                onClick={() => onHistoryClick(term)}
                            >
                                <span>{term}</span>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromHistory(term);
                                    }}
                                    className="p-0.5 hover:bg-[#ddd] rounded"
                                    aria-label={`Remove "${term}" from history`}
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={clearHistory}
                            className="text-[#1D98FF] font-semibold text-sm cursor-pointer hover:underline"
                        >
                            Delete all
                        </button>
                    </div>
                )}

                {/* Products */}
                <div className="space-y-4">
                    <h2 className="text-[#111] text-sm font-semibold">
                        {debouncedSearch.length > 0 ? 'Search results' : 'Recommended products'}
                    </h2>

                    {/* Mobile grid */}
                    <div className="lg:hidden grid grid-cols-2 gap-4">
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="h-full p-3 flex flex-col gap-6 bg-[#f7F7F7] rounded-sm animate-pulse">
                                    <div className="w-full aspect-[1] rounded-sm bg-gray-200" />
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                                </div>
                            ))
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="h-auto w-full">
                                    {renderProductCard(product)}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-8 text-[#111] text-sm">
                                No products found
                            </div>
                        )}
                    </div>

                    {/* Desktop Swiper */}
                    <div className="lg:block hidden">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={16}
                            slidesPerView="auto"
                            loop={false}
                            navigation={true}
                            grabCursor={true}
                            className={`search-swiper items-stretch! ${isLoading ? 'opacity-70' : ''}`}
                        >
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <SwiperSlide key={index} className="h-auto! max-w-[240px] w-full">
                                        <div className="h-full p-3 flex flex-col gap-6 bg-[#f7F7F7] rounded-sm animate-pulse">
                                            <div className="w-full aspect-[1] rounded-sm bg-gray-200" />
                                            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                                            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : products.length > 0 ? (
                                products.map((product) => (
                                    <SwiperSlide key={product.id} className="h-auto! max-w-[240px] w-full">
                                        {renderProductCard(product)}
                                    </SwiperSlide>
                                ))
                            ) : (
                                <div className="w-full py-8 text-center text-[#111] text-sm">
                                    No products found
                                </div>
                            )}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;