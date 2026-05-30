// src/redux/actions/restaurantActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getRestaurants,
  getRestaurantById,
  searchRestaurants,
} from "../../api/services/restaurantService";

// Load all restaurants
export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRestaurants();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch restaurants');
    }
  }
);

// Load a single restaurant by ID
export const fetchRestaurantById = createAsyncThunk(
  'restaurants/fetchRestaurantById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getRestaurantById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch restaurant details');
    }
  }
);

// Search restaurants via backend endpoint
export const searchRestaurantsThunk = createAsyncThunk(
  'restaurants /searchRestaurants',
  async (query, { rejectWithValue }) => {
    try {
      const data = await searchRestaurants(query);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Search failed');
    }
  }
);
