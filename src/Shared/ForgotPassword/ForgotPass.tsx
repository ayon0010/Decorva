import React from 'react'

const ForgotPass = () => {
    return (
        <div className='flex flex-col gap-4'>
            <h2 className={`product-title mb-0!`}>Forgot Password</h2>
            <p>
                You can securely and easily change your current password to enhance the security of your account.
            </p>
            <div className=''>
                <h3 className='text-lg pb-1 leading-[100%] global-b-bottom'>Set a new password</h3>
                <form className="flex flex-col gap-4 mt-4 max-w-[300px] w-full">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="currentPassword" className='text-sm font-medium'>Current Password</label>
                        <input id="currentPassword" type="password" placeholder='Current Password' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="newPassword" className='text-sm font-medium'>New Password</label>
                        <input id="newPassword" type="password" placeholder='New Password' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="confirmPassword" className='text-sm font-medium'>Confirm Password</label>
                        <input id="confirmPassword" type="password" placeholder='Confirm Password' className='w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base' />
                    </div>
                    <button type='submit' className='w-full bg-primary text-white py-3 px-4 rounded-sm transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]'>Set New Password</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPass;