import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddToCart } from '../Controllers/cart';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { Avgrating } from '../Controllers/utils';

function ProductCard({ data }) {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState({
    product: '',
    quantity: 1,
  });
  const dispatch = useDispatch();

  // Set the product ID in cartData when the data prop changes
  useEffect(() => {
    setCartData((prev) => ({ ...prev, product: data._id }));
  }, [data]);

  // Handle the "View" button click
  function onClickView() {
    navigate(`/products/${data._id}`);
  }

  // Handle adding the product to the cart
  async function handleAddToCart() {
    if (JSON.parse(localStorage.getItem('user'))) {
      dispatch(addItem(cartData));
      await AddToCart(cartData);
      return;
    }
    navigate('/login');
  }

  // Render the star rating based on the product's rating
  function RenderRating() {
    const rating = Avgrating(data?.rating);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <small className="fs-7">
            <i className="fa-solid fa-star"></i>
          </small>
        );
      } else {
        stars.push(
          <small className="fs-7">
            <i className="fa-regular fa-star"></i>
          </small>
        );
      }
    }

    return stars;
  }

  return (
    <div className="card rounded-0">
      <img
        src="https://picsum.photos/300"
        style={{ height: '150px' }}
        className="card-img-top rounded-0"
        alt="..."
      />
      <div className="card-body">
        <h6 className="card-title text-center">{data?.title}</h6>
        <p className="text-center">₹ {data?.price}</p>
        <p className="text-center fs-6">
          {RenderRating()}
        </p>
        <div className="d-flex justify-content-between mt-2">
          <button onClick={onClickView} className="btn btn-outline-secondary rounded-0">
            View
          </button>
          <button onClick={handleAddToCart} className="btn btn-outline-secondary rounded-0">
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
