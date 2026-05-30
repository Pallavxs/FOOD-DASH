import { api } from '../api';

// Service functions for restaurants
export const getRestaurants = async () => {
  const response = await api.get('/restaurants/');
  return response.data?.data ?? [];
};

export const getRestaurantById = async (id) => {
  if (!id) {
    throw new Error('Restaurant ID is required');
  }
  const response = await api.get(`/restaurants/${id}`);
  return response.data?.data ?? null;
};

export const searchRestaurants = async (query) => {
  const response = await api.get('/restaurants/search', {
    params: { q: query },
  });
  return response.data?.data ?? [];
};
