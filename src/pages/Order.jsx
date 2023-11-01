import React, { useEffect, useState } from 'react'
import OrderCard from '../components/OrderCard'
import {useSelector}  from 'react-redux'

const Order = () => {
    // type of for current orders
    const curOrder=useSelector((state)=>state.order.current)

    return (
        <div className='d-flex h-100 align-items-center justify-content-center align-items-center'>
            <OrderCard order={curOrder} showDetail={true} current={true}/>
        </div>
    )
}

export default Order