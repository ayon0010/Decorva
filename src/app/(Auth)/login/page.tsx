import LoginPage from '@/Shared/Form/LoginForm';
import React, { Suspense } from 'react'

const page = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <LoginPage />
            </Suspense>
        </div>
    )
}

export default page;