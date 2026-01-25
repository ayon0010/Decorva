import { auth } from '@/lib/auth'
import React from 'react'

const User = async () => {
    const session = await auth();
    return (
        <div>
            {
                JSON.stringify(session)
            }
        </div>
    )
}

export default User