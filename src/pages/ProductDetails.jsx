import React, { useEffect, useState } from 'react';
import { GetProductData } from '../Controllers/products';
import { AddToCart } from '../Controllers/cart';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { Avgrating } from '../Controllers/utils';

const ProductDetails = () => {
  // Retrieve the "id" parameter from the route
  const { id } = useParams();
  const [data, setData] = useState({});
  // Initialize cart data with the product ID and a quantity of 1
  const [cartData, setCartData] = useState({
    'product': id,
    'quantity': 1
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle adding the product to the cart
  async function HandleAddToCart() {
    if (JSON.parse(localStorage.getItem('user'))) {
      // Dispatch the action to add the item to the Redux store
      dispatch(addItem(cartData));
      // Call the function to add the item to the cart on the server
      await AddToCart(cartData);
      return;
    }
    // If user is not logged in, navigate to the login page
    navigate("/login");
  }

  // Function to fetch and set product details
  async function SetData() {
    setCartData((prev) => ({ ...prev, 'product': id }));
    const resp = await GetProductData(id);
    setData(resp);
  }

  // Function to generate the star rating display
  function HandleRating() {
    const rating = Avgrating(data?.rating);
    const element = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        element.push(
          <small className='fs-5'>
            <i className="fa-solid fa-star"></i>
          </small>
        );
      } else {
        element.push(
          <small className='fs-5'>
            <i className="fa-regular fa-star"></i>
          </small>
        );
      }
    }
    return element;
  }

  useEffect(() => {
    SetData();
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-between">
        <div className="col-md-6">
          <img
            src="https://picsum.photos/500"
            alt="Product"
            className="img-fluid w-100"
          />
        </div>
        <div className="col-md-6">
          <h2 className='text-center'>{data?.title}</h2>
          <p className="h5">{data?.desc}</p>
          <p className="h3 text-center">${data?.price}</p>
          <p className="h6">category: #{data?.category?.name}</p>
          <div className="text-center">
            {HandleRating()}
          </div>
          <div className="mb-3">
            <label className='me-2' htmlFor="quantity">Quantity</label>
            <input type="number" max={10} className='form-control' style={{ width: '70px' }}
              value={cartData.quantity}
              onChange={(e) => setCartData((prev) => ({ ...prev, 'quantity': e.target.value }))} />
          </div>
          <div className="row">
            <div className="col-12">
              <button onClick={() => {
                HandleAddToCart();
                navigate('/cart');
              }} className="btn btn-success w-100 mb-3 rounded-0">Buy Now</button>
            </div>
            <div className="col-12">
              <button onClick={() => {
                HandleAddToCart();
              }} className="btn btn-primary w-100 rounded-0">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
