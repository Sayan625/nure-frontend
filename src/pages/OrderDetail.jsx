import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import { GetOrderHistoryById } from '../Controllers/order';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  // Extract the "id" parameter from the URL
  const { id } = useParams();

  // State to store the order details
  const [order, setOrder] = useState({});

  useEffect(() => {
    // Fetch and set the order details when the component mounts
    SetOrderData();
  }, []);

  // Function to fetch and set the order details
  async function SetOrderData() {
    // Call the GetOrderHistoryById function with the extracted "id" parameter
    const resp = await GetOrderHistoryById(id);

    // Update the "order" state with the retrieved order data
    setOrder(() => resp);
  }

  return (
    <div className='d-flex align-items-center justify-content-center'>
      {/* Render the OrderCard component with the order details and showDetail set to true */}
      <OrderCard order={order} showDetail={true} />
    </div>
  );
}

export default OrderDetail;
