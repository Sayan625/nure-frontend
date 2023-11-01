import React, { useState } from 'react';
import { SingUp } from '../Controllers/login'; 
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify'; 

function SignUp() {
    const [formData, setFormData] = useState({
        address: '',
        username: '',
        email: '',
        password: '',
    });
    // Get the navigation function using useNavigate from React Router
    const navigate = useNavigate(); 

    // Function to handle form input changes
    function HandleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to handle form submission
    async function HandleSubmit(e) {
        const id = toast.loading("Please wait..."); // Show a loading toast
        e.preventDefault();
        const signIn = await SingUp(formData); // Call the SignUp function with form data

        if (signIn) {
            // If sign-up is successful
            toast.update(id, {
                render: "Sign-up successful",
                type: "success",
                isLoading: false,
                closeButton: true,
            });
            navigate('/login'); // Navigate to the login page
            return;
        } else {
            // If sign-up fails
            toast.update(id, {
                render: "Failed: Try again later",
                type: "error",
                isLoading: false,
                closeButton: true,
            });
        }
    };

    return (
        <div className="container mt-2" style={{ maxWidth: "300px" }}>
            <div className="card">
                <div className="card-header">
                    <h4 className='text-center'>Sign Up</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="lastName">Name</label>
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                value={formData.username}
                                onChange={(e) => HandleChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">Address</label>
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                value={formData.firstName}
                                onChange={(e) => HandleChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={(e) => HandleChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={(e) => HandleChange(e)}
                                required
                            />
                        </div>
                        <button type="submit" className="my-2 w-100 btn btn-primary rounded-0">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
