import React, { useState } from 'react'
import { ChangePasswordSchema } from '../Schema/LoginSchema';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import { EyeIcon, EyeOff } from 'lucide-react';


export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

const ForgotPass = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(ChangePasswordSchema),
    })
    const session = useSession();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data: ChangePasswordFormData) => {
        Swal.fire({
            title: 'Loading...',
            text: 'Please wait',
            icon: 'info',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
        });
        const response = await fetch('/api/change-password', {
            method: 'POST',
            body: JSON.stringify({ ...data, userId: session.data?.user?.id as string }),
        });
        const result = await response.json();
        if (result.success) {
            Swal.fire({
                title: 'Success!',
                text: result.message,
                icon: 'success',
            })
        } else {
            Swal.fire({
                title: 'Error!',
                text: result.message,
                icon: 'error',
            })
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <h2 className={`product-title mb-0!`}>Forgot Password</h2>
            <p>
                You can securely and easily change your current password to enhance the security of your account.
            </p>
            <div className=''>
                <h3 className='text-lg pb-1 leading-[100%] global-b-bottom'>Set a new password</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4 max-w-[300px] w-full">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="currentPassword" className='text-sm font-medium'>Current Password</label>
                        <div className='relative'>
                            <input id="currentPassword" type={showCurrentPassword ? 'text' : 'password'} placeholder='Current Password' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base pr-10' {...register("currentPassword")} />
                            {showCurrentPassword ? (
                                <EyeIcon className='w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setShowCurrentPassword(!showCurrentPassword)} />
                            ) : (
                                <EyeOff className='w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setShowCurrentPassword(!showCurrentPassword)} />
                            )}
                        </div>
                        {errors.currentPassword && <p className='text-red-500 text-sm mt-1'>{errors.currentPassword.message}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="newPassword" className='text-sm font-medium'>New Password</label>
                        <div className='relative'>
                            <input id="newPassword" type={showNewPassword ? 'text' : 'password'} placeholder='New Password' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base pr-10' {...register("newPassword")} />
                            {showNewPassword ? (
                                <EyeIcon className='w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setShowNewPassword(!showNewPassword)} />
                            ) : (
                                <EyeOff className='w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setShowNewPassword(!showNewPassword)} />
                            )}
                        </div>
                        {errors.newPassword && <p className='text-red-500 text-sm mt-1'>{errors.newPassword.message}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="confirmPassword" className='text-sm font-medium'>Confirm Password</label>
                        <div className='relative'>
                            <input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base pr-10' {...register("confirmNewPassword")} />
                            {showConfirmPassword ? (
                                <EyeIcon className='w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                            ) : (
                                <EyeOff className='w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                            )}
                        </div>
                        {errors.confirmNewPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmNewPassword.message}</p>}
                    </div>
                    <button type='submit' className='w-full bg-primary text-white py-3 px-4 rounded-sm transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]'>Set New Password</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPass;