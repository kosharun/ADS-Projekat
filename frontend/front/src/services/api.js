import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/', // prilagodi ako treba
});

// AUTH
export const getCurrentUserId = () => {
  return localStorage.getItem("userId");
};

// ORDERS
export const getUserOrders = (userId) => api.get(`/orders/user/${userId}`);
export const cancelOrder = (orderId) => api.put(`/orders/${orderId}/cancel`);
export const createOrder = (orderDTO) => api.post(`/orders`, orderDTO);

// PRODUCTS
export const getAvailableProducts = () => api.get(`/admin/products/available`);

export default api;
