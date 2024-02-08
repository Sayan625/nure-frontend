import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SingIn } from '../Controllers/login';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  // Function to handle the login process
  async function HandleLogin(e) {
    e.preventDefault();

    // Show a loading toast while the login is being processed
    const loadingToastId = toast.loading("Please wait...");

    const loggedIn = await SingIn({ 'email': email, 'password': password });

    if (!loggedIn) {
      // Display an error toast if login fails
      toast.update(loadingToastId, {
        render: "Login failed",
        type: "error",
        isLoading: false,
        closeButton: true,
      });
      return;
    }

    // If login is successful, update the user information in the Redux store
    const userData = {
      _id: JSON.parse(localStorage.getItem('user'))?._id,
      token: JSON.parse(localStorage.getItem('user'))?.token,
    };

    // Show a success toast
    toast.update(loadingToastId, {
      render: "Login successful",
      type: "success",
      isLoading: false,
      closeButton: true,
    });

    dispatch(setUser(userData));

    if (loggedIn.admin) {
      navigate('/admin'); // Redirect to the admin panel for admin users
    }

    if (loggedIn.user) {
      navigate("/"); // Redirect to the main page for regular users
    }

    navigate(0);
  }

  return (
    <div className="container position-static bottom-0">
      <div className="row px-3 h-100  align-items-center justify-content-center">
        <div className="card col-12 col-md-6 g-0">
          {/* Title */}
          <h3 className="card-header text-center">Login</h3>
          <div className="card-body">
            {/* Form */}
            <form id="loginForm" onSubmit={(e) => HandleLogin(e)}>
              {/* Email input */}
              <div className="mb-3">
                <label htmlFor="InputEmail" className="form-label">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control rounded-0"
                  placeholder="sayan@gmail.com"
                  required
                />
              </div>
              {/* Password input */}
              <div className="mb-3">
                <label htmlFor="InputPassword" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={visible ? "text" : "password"}
                    className="form-control rounded-0"
                    placeholder="1234"
                    required
                  />
                  {/* Button to toggle password visibility */}
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setVisible(!visible)}
                    type="button"
                  >
                    <i className="fa-regular fa-eye-slash"></i>
                  </button>
                </div>
              </div>
              {/* Submit button */}
              <button type="submit" id="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
