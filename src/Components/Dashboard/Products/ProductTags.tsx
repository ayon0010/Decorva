import React from 'react'

const ProductTags = () => {
    return (
        <div className='bg-white p-3 flex flex-col gap-2 border border-black/30'>
            <div className='text-base border-b border-b-black/30 pb-2'>
                Product Tags
            </div>
            <div className='mt-1 flex items-stretch gap-2'>
                <input type='text' placeholder='Separate tags with commas' className='border border-black/30 rounded-sm p-2 flex-1 max-w-[70%]' title='Add new tag' />
                <button type='button' className='bg-primary text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-primary/80 transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 text-xs'>Add</button>
            </div>
        </div>
    )
}

export default ProductTags