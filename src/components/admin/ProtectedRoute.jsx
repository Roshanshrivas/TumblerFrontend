import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userRole = user?.role || 'guest';

  if (!user) {
    // Save the current path so we can redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;