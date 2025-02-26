// ** React Imports
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Protected = ({ roles, children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // ** If user is NOT authenticated, redirect to Login page
  if (!isAuthenticated) {
    return <Navigate to='/login' />; // ** If not logged in, redirect to login
  }

  // ** If user is authenticated but their role is not allowed, redirect to Unauthorized page
  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to='/unauthorized' />; // Redirect to an unauthorized page
  }

  // ** If everything is fine, render the requested page
  return children;
};

export default Protected;
