import React, { createContext, useEffect, useCallback, useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";

const Auth = createContext();
const initialState = { user: {}, isAdmin: false, isAuthenticated: false };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: payload.user, isAdmin: payload.isAdmin };

    case "SET_LOGOUT":
      return { ...state, isAuthenticated: false, user: {}, isAdmin: false };

    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const navigate = useNavigate();

  // ***************Handle Logout**********
  const handleLogout = useCallback(() => {
    try {
      dispatch({ type: "SET_LOGOUT" });
      localStorage.removeItem("token");
      message.success("Logout successfully");
      setTimeout(() => {
        navigate("/auth/login");
      }, 500);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong while logging out");
    }
  }, [navigate]);

  // ***********Set user from token************
  const setUserFromToken = useCallback(async (token) => {
    setIsAppLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const user = response.data.user;

        if (!user || !user.role) {
          console.log("User not found");
          handleLogout();
          return;
        }
        const isAdmin = user.role.includes("admin");
        dispatch({ type: "LOGIN", payload: { user, isAdmin } });
        navigate("/");
      } else {
        handleLogout();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "SET_LOGOUT" });
      message.error("Session expired, please log in again.");
      navigate("/auth/login");
      localStorage.removeItem("token");
    } finally {
      setIsAppLoading(false);
    }
  }, [handleLogout, navigate]);

  // ***********Check token expiration************
  const checkTokenExpiration = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        message.error("Session expired, please log in again.");
        handleLogout();
      }
    }
  }, [handleLogout]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 5000); // Every 5 seconds check if token expired

    const fetchTokenAndFindUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        await setUserFromToken(token);
      } else {
        setIsAppLoading(false);
      }
    };

    fetchTokenAndFindUser();

    return () => {
      clearInterval(interval);
    };
  },[]); // Removed unnecessary dependencies

  return (
    <Auth.Provider value={{ ...state, handleLogout, isAppLoading, dispatch, setUserFromToken }}>
      {children}
    </Auth.Provider>
  );
}

export const useAuthContext = () => useContext(Auth);
