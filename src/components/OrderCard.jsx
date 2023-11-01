import React, { useEffect, useState } from 'react';
import { DateConverter } from '../Controllers/utils';
import { Link, useNavigate } from 'react-router-dom';
import { PlaceOrder } from '../Controllers/order';
import { useDispatch, useSelector } from "react-redux";
import { RateProduct } from '../Controllers/products';
import { clearCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const OrderDetails = ({ order, showDetail, current }) => {
  // State for the currently rated product and its rating
  const [currProduct, setCurrProduct] = useState({
    _id: '',
    rating: 1
  });

  // State to control the visibility of the rating form
  const [isRating, setIsRating] = useState(false);

  // React Router's navigation hook
  const navigate = useNavigate();

  // Redux dispatch function
  const dispatch = useDispatch();

  // Function to handle placing an order
  async function HandlePlaceOrder() {

    const loadingToastId = toast.loading("Please wait...");
    // Check if there are products in the order
    if (order.products.length > 0) {
      // Call the API to place the order
      await PlaceOrder(order);
      // Clear the cart in Redux
      dispatch(clearCart());
      // success toast
      toast.update(loadingToastId, {
        render: "order placed successfully",
        type: "success",
        isLoading: false,
        closeButton: true,
      })

      // Navigate to the order history page
      navigate('/orderhistory');
      return
    }
    // error toast
    toast.update(loadingToastId, {
      render: "order can not be place",
      type: "success",
      isLoading: false,
      closeButton: true,
    })
  }

  // Function to handle clicking the rate button for a product
  function OnRateClick(id) {
    // Set the product to be rated and show the rating form
    setIsRating(true);
    setCurrProduct((prev) => ({ ...prev, _id: id }));
  }

  // Function to handle submitting the product rating
  async function HandleRating() {
    // Call the API to rate the product
    await RateProduct(currProduct._id, currProduct.rating);
    // Hide the rating form and reset the current product and rating
    setIsRating(false);
    setCurrProduct({
      _id: "",
      rating: 1
    });
  }

  return (
    <div className="card my-2">
      <div className="card-body">
        {/* Display the order title */}
        <h6 className="card-title">Order #{order?._id}</h6>
        {/* Display the order date if it's not the current order */}
        {!current && <p className="card-text">Date: {DateConverter(order?.createdAt)}</p>}
        {/* Display the total order amount */}
        <p className="card-text">Total Amount: ${order?.amount}</p>
        {/* Display the order address and status if showDetail is true */}
        {showDetail && (
          <>
            <p className="card-text">Address: {order?.address}</p>
            <p className="card-text">Status: {order?.paid ? 'paid' : 'unpaid'}</p>
          </>
        )}
        {/* Heading for order items if showDetail is true */}
        {showDetail && <h5 className="card-subtitle mb-2 text-center">Items</h5>}

        {/* Display order items if showDetail is true */}
        {showDetail && order?.products?.map((item, index) => (
          <>
            <div key={index} className="container">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{item?.product?.title}</td>
                    <td>{item?.product?.price}</td>
                    <td>{item?.quantity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <>
              {/* Collapseable form for rating a product */}
              <div className="collapse" id={"collapse" + index}>
                <input type="number" min={1} max={5}
                  value={currProduct.rating}
                  className='form-control'
                  onChange={(e) => setCurrProduct((prev) => ({ ...prev, 'rating': e.target.value }))} />
              </div>
              {/* Save button for rating a product */}
              {(isRating && currProduct._id === item?.product?._id) && (
                <button
                  className="btn btn-success btn-sm w-100 mb-3"
                  type="button" data-bs-toggle="collapse"
                  data-bs-target={"#collapse" + index}
                  onClick={() => {
                    HandleRating();
                  }}
                >
                  Save
                </button>
              )}
              {/* Rate button for rating a product */}
              {(!isRating && !current) ? (
                <button disabled={isRating}
                  className="btn btn-primary btn-sm w-100 mb-3"
                  type="button" data-bs-toggle="collapse"
                  data-bs-target={"#collapse" + index}
                  onClick={() => {
                    OnRateClick(item?.product?._id);
                  }}
                >
                  Rate
                </button>
              ) : (
                ""
              )}
            </>
          </>
        ))}
        {/* Place order button for the current order */}
        {current && <button className='btn w-100 btn-success' onClick={() => HandlePlaceOrder()}>Place order</button>}
        {/* View Order Details link if showDetail is false */}
        {!showDetail && (
          <Link to={`/orders/${order?._id}`} className="btn btn-primary">
            View Order Details
          </Link>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
