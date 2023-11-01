import React, { useEffect, useState } from 'react';
import NavLinks from './NavLinks';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SignOut } from '../Controllers/login';
import { setUser, clearUser } from '../redux/userSlice';
import { setCart } from '../redux/cartSlice';
import { GetCartData } from '../Controllers/cart';
import { toast } from 'react-toastify';

function NavBar() {
  // Get the number of items in the cart from the Redux store
  const cartCount = useSelector((state) => state.cart.items.length);
  const dispatch = useDispatch();

  // Get the user information from the Redux store
  const user = useSelector((state) => state.user.current);

  useEffect(() => {
    // Check if the user is logged in (from localStorage) and update Redux store and cart data
    if (JSON.parse(localStorage.getItem('user'))) {
      // Prepare user data
      const userData = {
        _id: JSON.parse(localStorage.getItem('user'))._id,
        token: JSON.parse(localStorage.getItem('user')).token,
      };
      
      // Dispatch the user data to Redux store
      dispatch(setUser(userData));

      // Set the cart data
      SetCart();
    }
  }, []);

  // Function to fetch and update the cart data in Redux
  async function SetCart() {
    const data = await GetCartData();
    dispatch(setCart(data));
  }

  // Function to handle user logout
  function HandleLogout() {
    // Call the SignOut function to log the user out
    SignOut();
    // Clear user data from the Redux store
    dispatch(clearUser());
    // Show a success toast notification
    toast.success('Logged out successfully');
  }

  return (
    <div className="sticky-top" style={{ backgroundColor: "#e3f2fd" }}>
      <nav className="navbar pt-0 navbar-expand-md border-Bottom" style={{ borderBottom: '1px solid #2b2b2b' }}>
        <div className="container-fluid px-3">
          <Link className="navbar-brand me-auto mt-2 silent" to="/">
            <span className="me-1">
              <i className="fa-solid fa-snowflake"></i>
            </span>
            Nure
          </Link>
          <button
            className="btn navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mt-2 mb-lg-0">
              <li className="nav-item mb-2 mb-md-0">
                {/* Render "Logout" or "Login" button depending on the user's login status */}
                {user.token ? (
                  <Link className="btn btn-outline-primary rounded-0  me-2" onClick={HandleLogout} role="button" aria-current="page" to="/login">
                    Logout
                  </Link>
                ) : (
                  <Link className="btn btn-outline-primary rounded-0  me-2" role="button" aria-current="page" to="/login">
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item mb-2 mb-md-0">
                {/* Render "Register" button if the user is not logged in */}
                {!user.token && (
                  <Link className="btn btn-outline-primary rounded-0  me-2" role="button" aria-current="page" to="/signup">
                    Register
                  </Link>
                )}
              </li>
              <li className="nav-item mb-2 mb-md-0 me-2">
                <Link className="btn navBtn" role="button" aria-current="page" to="/cart">
                  <i className="fa-solid fa-cart-shopping">
                    {/* Show the cart item count next to the cart icon if the user is logged in */}
                    {user.token && <span className='ps-1'>{cartCount}</span>}
                  </i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Render navigation links component */}
      <NavLinks />
    </div>
  );
}

export default NavBar;
