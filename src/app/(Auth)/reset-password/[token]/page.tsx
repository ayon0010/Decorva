'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import loginImage from "@/../public/login-image.png"
import { lora } from '@/Shared/font/Rubik'
import Link from 'next/link'
import { ArrowLeft, EyeIcon, EyeOff } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Swal from 'sweetalert2'
import { ResetPasswordSchema } from '@/Shared/Schema/LoginSchema'

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>

const ResetPasswordPage = () => {
    const router = useRouter()
    const params = useParams()
    const token = params?.token as string
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(ResetPasswordSchema),
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Invalid reset link.',
            })
            return
        } Swal.fire({
            title: 'Loading...',
            text: 'Please wait',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })

        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token,
                password: data.password,
                confirmPassword: data.confirmPassword,
            }),
        })
        const result = await response.json()

        if (result.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: result.message,
                showConfirmButton: true,
            })
            router.push('/login')
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: result.message,
                showConfirmButton: true,
            })
        }
    }

    if (!token) {
        return (
            <div className='w-hull h-dvh flex bg-[#F1FAEC] relative overflow-hidden items-center justify-center'>
                <div className='text-center py-10 px-4'>
                    <h2 className={`global-h2 ${lora.className} font-semibold!`}>Invalid reset link</h2>
                    <p className='mt-4 text-black'>This password reset link is invalid or has expired.</p>
                    <Link href='/forgot-password' className='text-primary mt-4 inline-block'>Request a new link</Link>
                </div>
            </div>
        )
    }
    return (
        <div className='w-hull h-dvh flex bg-[#F1FAEC] relative overflow-hidden'>
            <Image src={loginImage} width={1000} height={1000} alt='reset-Decorva' className='aspect-auto object-contain absolute left-0 bottom-0 lg:w-[750px] 2xl:w-[1000px]' />
            <div className='layout global-padding z-10 py-10 flex md:flex-row flex-col items-stretch justify-between gap-10'>
                <div className='md:w-1/2 w-full'>
                    <h1 className={`${lora.className} global-h1 text-[#394233]`}>
                        <Link href='/'>Decorva</Link>
                    </h1>
                </div>
                <div className='md:w-1/2 w-full flex flex-col gap-4 my-auto max-w-[500px] bg-transparent backdrop-blur-[10px] shadow-2xl md:backdrop-blur-none md:shadow-none py-2 px-4 rounded-sm'>
                    <h2 className={`global-h2 ${lora.className} font-semibold!`}>Reset Password</h2>
                    <div className='flex items-center justify-between'>
                        <p className='md:text-xl text-base leading-[24px] text-black'>Enter your new password</p>
                        <button
                            type='button'
                            onClick={() => router.back()}
                            className='flex items-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer'
                        >
                            <ArrowLeft className='w-4 h-4' /> Back
                        </button>
                    </div><form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <div>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    placeholder='New password'
                                    className='w-full p-4 rounded-sm border border-black/70 placeholder:text-base text-base'
                                    {...register('password')}
                                />
                                {showPassword ? (
                                    <EyeIcon className='w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                                ) : (
                                    <EyeOff className='w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                                )}
                            </div>
                            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
                        </div>
                        <div>
                            <div className='relative'>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id='confirmPassword'
                                    placeholder='Confirm new password'
                                    className='w-full p-4 rounded-sm border border-black/70 placeholder:text-base text-base'
                                    {...register('confirmPassword')}
                                />                                {showConfirmPassword ? (
                                    <EyeIcon className='w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                                ) : (
                                    <EyeOff className='w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                                )}
                            </div>
                            {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
                        </div>
                        <button
                            className='w-full bg-primary text-white py-3 px-4 rounded-sm transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]'
                            type='submit'
                        >
                            Reset password
                        </button>
                    </form>
                    <p className='text-center'>Remember your password? <Link href='/login' className='text-primary'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}


export default ResetPasswordPage