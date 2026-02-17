'use client'
import ProductFeatureImage from '@/Components/Dashboard/Products/ProductFeatureImage';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
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
    const searchParams = useSearchParams();
    const blogId = searchParams.get('edit');

    const [blogTitle, setBlogTitle] = useState<string>('');
    const [productDescription, setProductDescription] = useState<string>('');
    const [productDescriptionHtml, setProductDescriptionHtml] = useState<string>('');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [existingFeaturedImageUrl, setExistingFeaturedImageUrl] = useState<string | null>(null);

    const { data: blog } = useQuery({
        queryKey: ['blog', blogId],
        queryFn: async () => {
            const response = await fetch(`/api/blog?id=${blogId}`);
            const data = await response.json();
            return data.blog;
        },
        enabled: !!blogId,
    });

    useEffect(() => {
        if (blog) {
            setBlogTitle(blog.title || '');
            setProductDescription(blog.content || '');
            setProductDescriptionHtml(blog.contentHtml || '');
            setExistingFeaturedImageUrl(blog.featuredImage || null);
        }
    }, [blog]);

    const handleProductDescriptionChange = (data: { productDescription: string; productDescriptionHtml: string }) => {
        setProductDescription(data.productDescription)
        setProductDescriptionHtml(data.productDescriptionHtml)
    }


    const handlePublishBlog = async () => {
        if (!blogTitle || !productDescriptionHtml) {
            Swal.fire({
                title: 'Validation',
                text: 'Blog title and HTML content are required',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }
        
        // Check image only if it's a new creation or if a new image has been selected
        if (!blogId && !featuredImage) {
            Swal.fire({
                title: 'Validation',
                text: 'Featured image is required',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }

        Swal.fire({
            title: blogId ? 'Updating blog...' : 'Publishing blog...',
            text: 'Please wait',
            icon: 'info',
            showConfirmButton: false,
        });

        try {
            let featuredImageUrl = existingFeaturedImageUrl;

            // Upload featured image to ImageBB only if a new image has been selected
            if (featuredImage) {
                const formData = new FormData();
                formData.append('file', featuredImage);
                const uploadRes = await fetch('/api/upload-image', { method: 'POST', body: formData });
                const uploadData = await uploadRes.json();
                
                if (!uploadData?.url) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to upload featured image',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                    return;
                }
                featuredImageUrl = uploadData.url;
            }

            const productDescriptionHtmlWithImgBB = await uploadHtmlImagesToImgBB(productDescriptionHtml);
            
            const payload = {
                ...(blogId && { id: blogId }),
                blogTitle,
                productDescriptionHtml: productDescriptionHtmlWithImgBB,
                content: productDescription,
                ...(featuredImageUrl && { featuredImage: featuredImageUrl }),
            };
            const res = await fetch('/api/blog', {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.success) {
                Swal.fire({
                    title: 'Success',
                    text: blogId ? 'Blog updated successfully' : 'Blog published successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    if (!blogId) {
                        // Reset form after creation
                        setBlogTitle('');
                        setProductDescription('');
                        setProductDescriptionHtml('');
                        setFeaturedImage(null);
                        setExistingFeaturedImageUrl(null);
                    }
                });
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch {
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while publishing the blog',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    }


    return (
        <section className='w-full flex flex-col gap-6 max-w-3/4'>
            <h2 className='text-2xl'>{blogId ? 'Edit blog' : 'Add new blog'}</h2>
            <input 
                type="text" 
                placeholder='Blog title' 
                className='w-full p-2 border border-black/30 rounded-sm' 
                value={blogTitle} 
                onChange={(e) => setBlogTitle(e.target.value)} 
            />
            <ProductFeatureImage 
                setFeaturedImage={setFeaturedImage} 
                defaultImageUrl={existingFeaturedImageUrl ?? null} 
            />
            <div className='w-full'>
                <ProductDescription 
                    heading="Blog Description" 
                    height="400px" 
                    onChange={handleProductDescriptionChange} 
                    defaultContent={productDescriptionHtml} 
                />
            </div>
            <div>
                <button 
                    onClick={() => handlePublishBlog()} 
                    type='button' 
                    title={blogId ? 'Update blog' : 'Publish blog'} 
                    className='border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 cursor-pointer px-4 py-2 rounded-sm text-xs w-fit'
                >
                    {blogId ? 'Update' : 'Publish'}
                </button>
            </div>
        </section>
    )
}

export default AddBlogPost;
