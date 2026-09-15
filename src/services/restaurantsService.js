import axios from "axios";

const API_URL = "http://localhost:4000/api"; // adjust if needed

export const getAllRestaurants = async () => {
  const response = await axios.get(`${API_URL}/restaurants`);
  return response.data;
};

export const getRestaurantsByCity = async (cityId) => {
  const response = await axios.get(`${API_URL}/restaurants/city/${cityId}`);
  return response.data;
};

export const searchRestaurants = async (query) => {
  const response = await axios.get(`${API_URL}/restaurants/search`, {
    params: { q: query },
  });
  return response.data;
};

export const getRestaurantById = async (id) =>
  (await axios.get(`${API_URL}/restaurants/${id}`)).data;

export const getRestaurantMenu = async (id) =>
  (await axios.get(`${API_URL}/restaurants/${id}/menu`)).data;
