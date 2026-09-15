import React, { createContext, useState, useEffect } from "react";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/authService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Load user from token on page refresh
  useEffect(() => {
    if (token) {
      getCurrentUser(token)
        .then((data) => {
          setUser(data.user || data);
        })
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  const register = async (name, email, password) => {
    const data = await registerUser(name, email, password);
    setToken(data.token);
    localStorage.setItem("token", data.token);

    // Instant UI update
    if (data.user) setUser(data.user);

    // Ensure freshest info from backend
    const userData = await getCurrentUser(data.token);
    setUser(userData.user || userData);
  };

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    setToken(data.token);
    localStorage.setItem("token", data.token);

    // Instant UI update
    if (data.user) setUser(data.user);

    // Ensure freshest info from backend
    const userData = await getCurrentUser(data.token);
    setUser(userData.user || userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
