import React, { useEffect, useState } from 'react';
import OrderDetails from '../components/OrderCard';
import { GetOrderHistory } from '../Controllers/order';

const OrderHistory = () => {
  // State to store the list of orders
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch and set the order history data when the component mounts
    SetOrderData();
  }, []);

  // Function to fetch and set the order history data
  async function SetOrderData() {
    // Call the GetOrderHistory function to retrieve a list of orders
    const resp = await GetOrderHistory();

    // Update the "orders" state with the retrieved order history data
    setOrders(() => resp);
  }

  return (
    <div className="container d-flex flex-column align-items-center">
      <h2 className="my-4">Order History</h2>
      {orders?.map((item, index) => (
        // Render the OrderDetails component for each order with showDetail set to false
        <OrderDetails key={index} order={item} showDetail={false} />
      ))}
    </div>
  );
};

export default OrderHistory;
