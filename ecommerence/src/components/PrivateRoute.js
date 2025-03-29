import React from "react";
import { useAuthContext } from "../context/AuthContext"; // Custom hook to get auth state
import { Navigate } from "react-router-dom";

export default function PrivateRoute({Component  }) {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Component/>  : <Navigate to="/auth/login" />;
}
