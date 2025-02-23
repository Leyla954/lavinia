import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((c) => c.id === item.id);
      exists ? exists.quantity++ : state.items.push({ ...item, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((c) => c.id !== action.payload.id);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((c) => c.id === action.payload.id);
      if (item) item.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((c) => c.id === action.payload.id);
      if (item) item.quantity > 1 ? item.quantity-- : state.items = state.items.filter((c) => c.id !== item.id);
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
