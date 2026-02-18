'use client'

import React from 'react'
import { Facebook, Twitter, Linkedin, Link2, Copy, Check } from 'lucide-react'

interface ShareButtonsProps {
    url: string
    title: string
    description?: string
}

const ShareButtons = ({ url, title, description }: ShareButtonsProps) => {
    const [copied, setCopied] = React.useState(false)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `${siteUrl}${url}`
    const shareTitle = title
    const shareDescription = description || ''

    const handleShare = (platform: string) => {
        const encodedUrl = encodeURIComponent(shareUrl)
        const encodedTitle = encodeURIComponent(shareTitle)
        const encodedDescription = encodeURIComponent(shareDescription)

        let shareLink = ''

        switch (platform) {
            case 'facebook':
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
                break
            case 'twitter':
                shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
                break
            case 'linkedin':
                shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
                break
            default:
                return
        }

        window.open(shareLink, '_blank', 'width=600,height=400')
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
            // Fallback for older browsers
            const textArea = document.createElement('textarea')
            textArea.value = shareUrl
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className='flex items-center gap-4'>
            <span className='font-semibold text-sm'>Share this post:</span>
            <div className='flex items-center gap-x-2'>
                <button
                    onClick={() => handleShare('facebook')}
                    className='p-2 bg-[#E1E1E1] rounded-full hover:bg-[#1877F2] hover:text-white transition-all duration-200 cursor-pointer'
                    aria-label='Share on Facebook'
                    title='Share on Facebook'
                >
                    <Facebook fill='currentColor' className='w-3 h-3' />
                </button>
                <button
                    onClick={() => handleShare('twitter')}
                    className='p-2 bg-[#E1E1E1] rounded-full hover:bg-[#1DA1F2] hover:text-white transition-all duration-200 cursor-pointer'
                    aria-label='Share on Twitter'
                    title='Share on Twitter'
                >
                    <Twitter fill='currentColor' className='w-3 h-3' />
                </button>
                <button
                    onClick={() => handleShare('linkedin')}
                    className='p-2 bg-[#E1E1E1] rounded-full hover:bg-[#0077B5] hover:text-white transition-all duration-200 cursor-pointer'
                    aria-label='Share on LinkedIn'
                    title='Share on LinkedIn'
                >
                    <Linkedin fill='currentColor' className='w-3 h-3' />
                </button>
                <button
                    onClick={handleCopyLink}
                    className='p-2 bg-[#E1E1E1] rounded-full hover:bg-gray-600 hover:text-white transition-all duration-200 cursor-pointer relative'
                    aria-label='Copy link'
                    title='Copy link'
                >
                    {copied ? (
                        <Check className='w-3 h-3' />
                    ) : (
                        <Link2 className='w-3 h-3' />
                    )}
                </button>
            </div>
        </div>
    )
}

export default ShareButtons
