import React, { useEffect, useState } from 'react';
import { GetCartData } from '../Controllers/cart';
import { TotalCost } from '../Controllers/utils';
import { useDispatch } from 'react-redux';
import { setCurrentOrder } from '../redux/orderSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Payment() {
  // State to store order details, including address, amount, date, and products
  const [order, setOrder] = useState({
    address: JSON.parse(localStorage.getItem('user'))? JSON.parse(localStorage.getItem('user')).address : "", // Initialize address with user's address
    amount: 0, // Initialize amount to 0
    date: Date.now(), // Set the current date
    products: [], // Initialize products as an empty array
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch and set order details from the cart when the component mounts
    SetOrderDetails();
  }, []);

  // Function to continue to the next step (e.g., order confirmation)
  function HandleContinue() {
    if(!order.address || order.address=="")
    {
      toast.error("address can not be empty")
      return
    }
    // Set the current order in the Redux store
    dispatch(setCurrentOrder(order));
    // Navigate to the order confirmation page
    navigate('/order');
  }

  // Function to fetch and set order details from the cart
  async function SetOrderDetails() {
    const resp = await GetCartData();
    // Update the order state with the retrieved products and calculate the total amount
    setOrder((prev) => ({
      ...prev,
      products: resp,
      amount: TotalCost(resp),
    }));
  }

  return (
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="card-header">Payment Method</div>
        <div className="card-body">
          <p className="d-block" >
            Address
          </p>
          <input
            id="1"
            type="text"
            className="form-control mb-2"
            value={order.address}
            onChange={(e) =>
              setOrder((prev) => ({ ...prev, address: e.target.value }))
            }
          />
          <form action="">
            <div className="form-check">
              <input type="radio" defaultChecked className="form-check-input" />
              <label htmlFor="cashOnDelivery" className="form-check-label">
                Cash on Delivery
              </label>
            </div>
          </form>
          <button onClick={() => HandleContinue()} className="btn btn-primary mt-3">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
