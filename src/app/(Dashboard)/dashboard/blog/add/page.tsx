'use client'
import ProductFeatureImage from '@/Components/Dashboard/Products/ProductFeatureImage';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
const ProductDescription = dynamic(
    () => import('@/Components/Dashboard/Products/ProductDescription'),
    { ssr: false }
);


async function uploadHtmlImagesToImgBB(html: string): Promise<string> {
    if (!html || !html.includes('<img')) return html
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const imgs = Array.from(doc.querySelectorAll<HTMLImageElement>('img'))
    const toUpload = imgs.filter((img) => img.src?.startsWith('data:') || img.src?.startsWith('blob:'))
    await Promise.all(
        toUpload.map(async (img) => {
            try {
                const res = await fetch(img.src)
                const blob = await res.blob()
                const ext = blob.type.split('/')[1] || 'png'
                const file = new File([blob], `image-${Date.now()}.${ext}`, { type: blob.type })
                const formData = new FormData()
                formData.append('file', file)
                const uploadRes = await fetch('/api/upload-image', { method: 'POST', body: formData })
                const data = await uploadRes.json()
                if (data?.url) img.setAttribute('src', data.url)
            } catch {
                // keep original src on failure
            }
        })
    )
    return doc.body?.innerHTML ?? html
}

const AddBlogPost = () => {
    const [blogTitle, setBlogTitle] = useState<string>('');
    const [productDescription, setProductDescription] = useState<string>('');
    const [productDescriptionHtml, setProductDescriptionHtml] = useState<string>('');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);

    const handleProductDescriptionChange = (data: { productDescription: string; productDescriptionHtml: string }) => {
        setProductDescription(data.productDescription)
        setProductDescriptionHtml(data.productDescriptionHtml)
    }

    console.log(productDescriptionHtml);
    console.log(productDescription);
    console.log(featuredImage);
    


    return (
        <section className='w-full flex flex-col gap-6 max-w-3/4'>
            <h2 className='text-2xl'>Add new blog</h2>
            <input type="text" placeholder='Blog title' className='w-full p-2 border border-black/30 rounded-sm' value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
            <ProductFeatureImage setFeaturedImage={setFeaturedImage} defaultImageUrl={'' ?? null} />
            <div className='w-full'>
                <ProductDescription heading="Product Description" height="400px" onChange={handleProductDescriptionChange} defaultContent={productDescriptionHtml} />
            </div>
        </section>
    )
}

export default AddBlogPost;