"use client"
import React from 'react'
import ProductCard from '../Card/ProductCard'
import ReactRangeSliderInput from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css';

const AllProducts = () => {

    const handleChange = (val: [number, number]) => {
        console.log(val)
    }


    // const renderCategories = (categories) => {
    //     const logSelectedCategoryIds = () => {
    //         const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    //         const selectedIds = Array.from(checkedBoxes).map(cb => cb.value)?.length > 0 ? Array.from(checkedBoxes).map(cb => cb.value) : id;
    //         setIds(selectedIds);
    //     };

    //     return (
    //         <ul className="space-y-3">
    //             {categories.map((cat) => (
    //                 <li key={cat.id} className="flex flex-col">
    //                     {/* Checkbox + Label */}
    //                     <label className="flex items-center gap-2 cursor-pointer">
    //                         <input
    //                             type="checkbox"
    //                             className="peer w-3 h-3 cursor-pointer accent-black"
    //                             value={cat.id}
    //                             onChange={logSelectedCategoryIds}
    //                         />
    //                         <span className="text-[#999] font-semibold text-[14px] leading-[16px] uppercase peer-checked:text-[#111111bf]">
    //                             {cat.name}
    //                         </span>
    //                     </label>

    //                     {/* Children */}
    //                     {Array.isArray(cat.children) && cat.children.length > 0 && (
    //                         <div className="ml-6 mt-3">
    //                             {renderCategories(cat.children)}
    //                         </div>
    //                     )}
    //                 </li>
    //             ))}
    //         </ul>
    //     );
    // };


    return (
        <div className='w-full flex items-start justify-between gap-10'>
            <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-start w-3/4 gap-6'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
            <div className='sticky top-[80px] w-1/4 flex flex-col gap-10'>
                <div>
                    <h3 className='filter-heading'>Filter By Price</h3>
                    <ReactRangeSliderInput min={0} max={1000} defaultValue={[0, 1000]} onInput={(val) => handleChange(val)} className='my-dashed-slider' />
                </div>
                <div>
                    <h3 className='filter-heading'>Filter By Category</h3>

                </div>
            </div>
        </div>
    )
}

export default AllProducts