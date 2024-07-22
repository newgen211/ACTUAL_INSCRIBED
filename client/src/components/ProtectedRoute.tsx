import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { auth } = useAuth();

    if (!auth) {
        // If not authenticated, redirect to login
        return <Navigate to="/" />;
    }

    // If authenticated, render the outlet (child components)
    return <Outlet />;
};

export default ProtectedRoute;
