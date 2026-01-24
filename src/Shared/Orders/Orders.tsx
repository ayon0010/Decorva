import React from 'react'
import SingleOrder from './SingleOrder';

const Orders = () => {
    return (
        <div className='flex flex-col gap-4'>
            <h2 className={`product-title mb-0!`}>Orders</h2>
            <p>
                Here, you can review all your previous orders, track the status of active orders, edit or cancel them as needed.
            </p>
            <SingleOrder order={{}}/>
        </div>
    )
}

export default Orders;