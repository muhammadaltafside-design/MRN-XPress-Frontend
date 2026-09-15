// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:4000/api/auth"; // backend base URL

// Register
export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });
  return response.data;
};

// Login
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

// Get current user (requires token)
export const getCurrentUser = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
