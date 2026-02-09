import Skeleton from '@/Shared/Loader/Skeleton';
import React from 'react'

const loading = () => {
    return (
        <div className='w-full flex flex-col gap-4'>
            <Skeleton className='w-full h-[500px]' />
            <Skeleton className='w-full h-[500px]' />
            <Skeleton className='w-full h-[500px]' />
        </div>
    )
}

export default loading;