'use client';
import { Order, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const formatDate = (date: Date | string | null): string => {
    if (!date) return 'N/A';
    const d = new Date(date);
    const day = d.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
};

const AllCustomers = () => {

    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`);
            const data = await response.json();
            if (data.success) {
                return data.data;
            }
            throw new Error(data.message);
        }
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    console.log(users);

    return (
        <div>
            <table className='w-full overflow-x-auto table'>
                <thead>
                    <tr className='bg-[#FAFAFA] border-b border-b-black/50 text-sm font-normal'>
                        <th className='p-2 text-left'>Customer ID</th>
                        <th className='p-2 text-left'>Name</th>
                        <th className='p-2 text-left'>Email</th>
                        <th className='p-2 text-left'>Phone</th>
                        <th className='p-2 text-left'>No. Of Orders</th>
                        <th className='p-2 text-left'>Total Orders</th>
                        <th className='p-2 text-left'>Status</th>
                        <th className='p-2 text-left'>Last Order</th>
                    </tr>
                </thead>
                <tbody className='text-xs'>
                    {users?.map((user: User & { orders: Order[] }) => (
                        <tr key={user.id} className='border-b border-b-black/50'>
                            <td className='p-2 text-left'>#{user.id.slice(-5)}</td>
                            <td className='p-2 text-left'>{user.firstName} {user.lastName}</td>
                            <td className='p-2 text-left'>{user.email}</td>
                            <td className='p-2 text-left'>{user.phone}</td>
                            <td className='p-2 text-left'>{user.orders.length}</td>
                            <td className='p-2 text-left'>{user.orders.reduce((acc: number, order: Order) => acc + order.total, 0).toFixed(2)} AED</td>
                            <td className='p-2 text-left'>{user.isActive ? 'Active' : 'Inactive'}</td>
                            <td className='p-2 text-left'>{formatDate(user.lastOrderDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllCustomers