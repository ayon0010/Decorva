'use client'

import { Edit, Eye, Image as ImageIcon, Trash } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import Skeleton from '@/Shared/Loader/Skeleton'
import { useCallback, useMemo, useState } from 'react'

const COL_COUNT = 6

interface BlogListItem {
    id: string
    title: string
    slug: string
    content: string
    contentHtml: string
    featuredImage: string | null
    createdAt: string
    updatedAt: string
}

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url)
    if (!response.ok) {
        const text = await response.text()
        let message = `Request failed (${response.status})`
        try {
            const data = JSON.parse(text)
            if (data?.message) message = data.message
        } catch {
            if (text) message = text.slice(0, 100)
        }
        throw new Error(message)
    }
    return response.json()
}

function formatDate(iso: string | null | undefined): string {
    if (!iso) return '—'
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return '—'
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function truncateText(text: string, maxLength: number = 100): string {
    if (!text) return '—'
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}

function stripHtml(html: string): string {
    if (!html) return ''
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
}

const AllBlogsPage = () => {
    const [searchQuery, setSearchQuery] = useState<string>('')

    const {
        data: blogs = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['allBlogs'],
        queryFn: async () => {
            const data = await fetchJson<{ blogs?: BlogListItem[] }>('/api/blog')
            return data.blogs ?? []
        },
        staleTime: 60 * 1000,
    })

    const handleDelete = useCallback(
        (id: string, title: string) => {
            Swal.fire({
                title: 'Are you sure?',
                text: `You want to delete the blog "${title}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#79A206',
            }).then(async (result) => {
                if (!result.isConfirmed) return

                Swal.fire({
                    title: 'Deleting...',
                    text: 'Please wait.',
                    icon: 'info',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                })

                try {
                    const response = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
                    const data = await response.json()

                    if (data?.success) {
                        await refetch()
                        await Swal.fire({
                            icon: 'success',
                            title: 'Done',
                            text: data.message ?? 'Blog deleted.',
                        })
                    } else {
                        await Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data?.message ?? 'Delete failed.',
                        })
                    }
                } catch {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Could not delete blog. Please try again.',
                    })
                }
            })
        },
        [refetch]
    )

    const filteredBlogs = useMemo(() => {
        if (!Array.isArray(blogs)) return []
        if (!searchQuery.trim()) return blogs

        const query = searchQuery.toLowerCase().trim()
        return blogs.filter((blog) => {
            return (
                blog.title.toLowerCase().includes(query) ||
                blog.slug.toLowerCase().includes(query) ||
                stripHtml(blog.contentHtml).toLowerCase().includes(query)
            )
        })
    }, [blogs, searchQuery])

    return (
        <div className="flex flex-col gap-4" role="region" aria-label="Blogs list">
            <header className="flex flex-wrap items-center gap-4">
                <h1 className="text-2xl font-semibold">Blogs</h1>
                <Link
                    href="/dashboard/blog/add"
                    className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-white transition-all duration-200 hover:bg-primary/80 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-[0.97]"
                >
                    Add new blog
                </Link>
            </header>

            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Search">
                <label className="sr-only" htmlFor="search-blog">
                    Search for a blog
                </label>
                <input
                    id="search-blog"
                    type="text"
                    placeholder="Search by title, slug or content..."
                    className="flex-1 min-w-[200px] rounded-sm border border-black/30 p-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {isError && (
                <div
                    className="rounded-sm border border-red-200 bg-red-50 p-4 text-red-800"
                    role="alert"
                >
                    <p className="font-medium">Failed to load blogs</p>
                    <p className="mt-1 text-sm">{error instanceof Error ? error.message : 'Unknown error'}</p>
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="mt-3 rounded-sm bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 focus-visible:outline focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                        Retry
                    </button>
                </div>
            )}

            <div className="overflow-x-auto rounded-sm border border-black/30 bg-white">
                <table className="w-full border-collapse text-xs" role="table" aria-label="Blogs table">
                    <thead className="border-b border-black/50 bg-[#FAFAFA]">
                        <tr className="text-left">
                            <th className="p-2" scope="col" aria-label="Image">
                                <ImageIcon className="mx-auto h-4 w-4" aria-hidden />
                            </th>
                            <th className="p-2 text-left" scope="col">
                                Title
                            </th>
                            <th className="p-2" scope="col">
                                Slug
                            </th>
                            <th className="p-2" scope="col">
                                Content
                            </th>
                            <th className="p-2" scope="col">
                                Created Date
                            </th>
                            <th className="p-2" scope="col">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="border-b border-black/50 bg-[#F6F7F7]">
                                    <td colSpan={COL_COUNT} className="p-2">
                                        <Skeleton className="h-12 w-full" />
                                    </td>
                                </tr>
                            ))
                        ) : filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog) => (
                                <tr
                                    key={blog.id}
                                    className="border-b border-black/50 bg-[#F6F7F7]"
                                >
                                    <td className="p-2 text-center">
                                        {blog.featuredImage ? (
                                            <Image
                                                src={blog.featuredImage}
                                                alt=""
                                                width={50}
                                                height={50}
                                                className="mx-auto h-[50px] w-[50px] object-cover"
                                                unoptimized={!blog.featuredImage.startsWith('/')}
                                            />
                                        ) : (
                                            <span
                                                className="mx-auto flex h-[50px] w-[50px] items-center justify-center rounded bg-gray-200"
                                                aria-hidden
                                            >
                                                <ImageIcon className="h-5 w-5 text-gray-400" />
                                            </span>
                                        )}
                                    </td>
                                    <td className="max-w-[200px] truncate p-2 font-medium" title={blog.title}>
                                        {blog.title}
                                    </td>
                                    <td className="max-w-[150px] truncate p-2 text-gray-600" title={blog.slug}>
                                        {blog.slug}
                                    </td>
                                    <td className="max-w-[250px] p-2 text-gray-600">
                                        {truncateText(stripHtml(blog.contentHtml), 80)}
                                    </td>
                                    <td className="whitespace-nowrap p-2">{formatDate(blog.createdAt)}</td>
                                    <td className="p-2">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                href={`/dashboard/blog/add?edit=${blog.id}`}
                                                aria-label={`Edit ${blog.title}`}
                                                className="text-current hover:text-primary focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary/50"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(blog.id, blog.title)}
                                                aria-label={`Delete ${blog.title}`}
                                                className="text-current hover:text-primary focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary/50"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </button>
                                            <Link
                                                href={`/blog/${blog.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`View ${blog.title}`}
                                                className="text-current hover:text-primary focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary/50"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="border-b border-black/50 bg-[#F6F7F7]">
                                <td colSpan={COL_COUNT} className="p-8 text-center">
                                    <p className="text-gray-500">No blogs found</p>
                                    <p className="mt-1 text-sm text-gray-400">
                                        {searchQuery
                                            ? 'Try changing your search or add a new blog.'
                                            : 'Add a new blog to get started.'}
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllBlogsPage
