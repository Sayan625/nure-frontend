import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ admin }) => {
  // Check if the user is authenticated
  const auth = JSON.parse(localStorage.getItem('user'))?.token;
  // Check if the user is an admin
  const isAdmin = JSON.parse(localStorage.getItem('user'))?.isAdmin;

  // If 'admin' prop is true, restrict access to admin users
  if (admin) {
    return isAdmin ? <Outlet /> : <Navigate to="/login" />;
  } else {
    // For regular routes, check if the user is authenticated
    return auth ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
