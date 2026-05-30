import { createSlice } from '@reduxjs/toolkit';

// Each cart item: { _id, name, price, image, quantity }
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i._id === item._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(i => i._id !== id);
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find(i => i._id === id);
      if (item) item.quantity += 1;
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find(i => i._id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item) {
        // If quantity would go to 0, remove the item
        state.items = state.items.filter(i => i._id !== id);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
