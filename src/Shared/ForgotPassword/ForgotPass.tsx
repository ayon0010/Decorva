import React from 'react'
import { ChangePasswordSchema } from '../Schema/LoginSchema';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';


export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

const ForgotPass = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(ChangePasswordSchema),
    })


    const session = useSession();


    console.log(session.data?.user?.id);


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
                        <input id="currentPassword" type="password" placeholder='Current Password' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' {...register("currentPassword")} />
                        {errors.currentPassword && <p className='text-red-500 text-sm mt-1'>{errors.currentPassword.message}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="newPassword" className='text-sm font-medium'>New Password</label>
                        <input id="newPassword" type="password" placeholder='New Password' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' {...register("newPassword")} />
                        {errors.newPassword && <p className='text-red-500 text-sm mt-1'>{errors.newPassword.message}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="confirmPassword" className='text-sm font-medium'>Confirm Password</label>
                        <input id="confirmPassword" type="password" placeholder='Confirm Password' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' {...register("confirmNewPassword")} />
                        {errors.confirmNewPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmNewPassword.message}</p>}
                    </div>
                    <button type='submit' className='w-full bg-primary text-white py-3 px-4 rounded-sm transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]'>Set New Password</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPass;