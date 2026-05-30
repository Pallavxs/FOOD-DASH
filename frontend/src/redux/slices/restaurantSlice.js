import { createSlice } from '@reduxjs/toolkit';
import {
  fetchRestaurants,
  fetchRestaurantById,
  searchRestaurantsThunk,
} from '../actions/restaurantActions';

const initialState = {
  restaurants: [],
  selectedRestaurant: null,
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchRestaurants
    builder.addCase(fetchRestaurants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRestaurants.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurants = action.payload;
      state.error = null;
    });
    builder.addCase(fetchRestaurants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // fetchRestaurantById
    builder.addCase(fetchRestaurantById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRestaurantById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedRestaurant = action.payload;
      state.error = null;
    });
    builder.addCase(fetchRestaurantById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // searchRestaurantsThunk
    builder.addCase(searchRestaurantsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchRestaurantsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurants = action.payload;
      state.error = null;
    });
    builder.addCase(searchRestaurantsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const selectRestaurants = (state) => state.restaurant.restaurants;
export const selectSelectedRestaurant = (state) => state.restaurant.selectedRestaurant;
export const selectRestaurantLoading = (state) => state.restaurant.loading;
export const selectRestaurantError = (state) => state.restaurant.error;

export default restaurantSlice.reducer;
