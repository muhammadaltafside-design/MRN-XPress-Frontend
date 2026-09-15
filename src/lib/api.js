import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// A single axios instance for the app
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // allow cookies if you choose httpOnly cookies for auth
});

// Allow setting auth token (Bearer) globally on this instance
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export async function getCities() {
  const { data } = await api.get("/cities");
  return data; // expect [{ _id, name }, ...]
}

export async function getCuisines() {
  const { data } = await api.get("/cuisines");
  return data; // expect [{ _id?, name }, ...] or strings
}

/**
 * params: { cityId, cuisine, q, sort, page, limit }
 * Expected backend shape (preferred): { data, total, page, limit }
 * Fallback handled: if array returned, wrap it.
 */
export async function getRestaurants(params = {}) {
  const { data } = await api.get("/restaurants", { params });
  if (Array.isArray(data)) {
    return { data, total: data.length, page: 1, limit: data.length || 1 };
  }
  return data;
}

export async function getRestaurantById(id) {
  const { data } = await api.get(`/restaurants/${id}`);
  // Your GET /restaurants/:id returns the raw object (not {data}) — keep as-is
  return data;
}

// primary: /restaurants/:id/menu
// fallback: /menus?restaurantId=...
export async function getRestaurantMenu(restaurantId) {
  try {
    const { data } = await api.get(`/restaurants/${restaurantId}/menu`);
    return data; // { sections: [...] } or similar
  } catch (err) {
    // If the API returns 404, consider that “no menu” rather than an error
    if (err?.response?.status === 404) return { sections: [] };

    // fallback to /menus?restaurantId=...
    try {
      const { data } = await api.get(`/menus`, { params: { restaurantId } });
      return Array.isArray(data) ? data[0] : data;
    } catch (fallbackErr) {
      if (fallbackErr?.response?.status === 404) return { sections: [] };
      // still failing → bubble up to show the error state
      throw fallbackErr;
    }
  }
}

export async function createOrder(payload) {
  const { data } = await api.post(`/orders`, payload);
  return data; // { id }
}

export async function getOrderById(id) {
  const { data } = await api.get(`/orders/${id}`);
  return data;
}
