import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [] },
  reducers: {
    toggleWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.items.some((w) => w.id === item.id);
      state.items = exists ? state.items.filter((w) => w.id !== item.id) : [...state.items, item];
    }
  }
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
