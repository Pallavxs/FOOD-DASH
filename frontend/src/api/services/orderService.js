import { api } from '../../api/api';

export const createOrder = (payload) => api.post('orders/create', payload);
export const fetchOrders = () => api.get('orders/');
export const getOrderById = (id) => api.get(`orders/${id}`);
