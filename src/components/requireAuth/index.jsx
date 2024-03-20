import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function RequireAuth() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/unauthorized" state={{ from: location }} repalce />
    );
}

ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
};
