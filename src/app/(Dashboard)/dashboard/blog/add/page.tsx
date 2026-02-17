import React, { Suspense } from 'react'
import Add from './Add';

const AddBlogPage = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}><Add /></Suspense>
        </>
    )
}

export default AddBlogPage;