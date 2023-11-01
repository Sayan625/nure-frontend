import React, { useEffect, useState } from 'react';
import { GetCartData,EmptyCart } from '../Controllers/cart';
import { TotalCost } from '../Controllers/utils';
import CartProductCard from '../components/CartProductCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCart,clearCart } from '../redux/cartSlice';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart data from Redux state
  const cart = useSelector((state) => state.cart.items);

  // Initialize shipping cost (you may set it to an actual value)
  const [shippingCost, setShippingCost] = useState(0);

  // Function to fetch cart data
  async function SetData() {
    const resp = await GetCartData();
    dispatch(setCart(resp));
  }
// function to clear cart
async function ClearCart(){

    await EmptyCart()
    dispatch(clearCart())

}
  // Fetch cart data when the component mounts
  useEffect(() => {
    SetData();
  }, []);

  return (
    <div>
      <div className="container p-0">
        <div className="row p-3 justify-content-center">
          <div className="col-12 col-md-7 mb-3 p-3">
            <div className="row g-0">
              {/* Display cart items */}
              {cart.length === 0 && <h4>No Items</h4>}
              {cart?.map((item) => (
                <div className="col-12">
                  <CartProductCard data={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-5 mb-3 p-3">
            {/* Cart summary */}
            <div className="card summery">
              <h4 className="card-header text-center">Summary</h4>
              <div className="card-body d-flex flex-column justify-content-between text-center">
                {/* Item cost */}
                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <p>Cost</p>
                  <p>₹<span id="itemCost">{TotalCost(cart)}</span></p>
                </div>
                {/* Shipping cost */}
                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <p>Shipping</p>
                  <p>₹<span id="shippingCost">{shippingCost}</span></p>
                </div>
                {/* Total cost */}
                <div className="my-3 d-flex justify-content-between align-items-center secondary-border-Top">
                  <p>Total</p>
                  <p>₹<span id="total">{TotalCost(cart) + shippingCost}</span></p>
                </div>
                {/* Check out option */}
                <button
                  disabled={cart.length > 0 ? false : true}
                  onClick={() => {
                    navigate('/payment'); // Navigate to the payment page
                  }}
                  className="btn btn-success rounded-0 mb-2"
                >
                  Check Out
                </button>
                <button disabled={cart.length > 0 ? false : true} className="btn btn-danger rounded-0" onClick={()=>ClearCart()}>clear cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
