import { api } from '../api';

// Service function for fetching menu items by restaurant ID
export const getMenuByRestaurantId = async (restaurantId) => {
  if (!restaurantId) {
    throw new Error('Restaurant ID is required to fetch menu');
  }
  const response = await api.get(`/menus/restaurant/${restaurantId}`);
  // API returns array directly
  return response.data ?? [];
};
