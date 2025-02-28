import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [] },
  reducers: {
    toggleWishlist: (state, action) => {
      const item = action.payload;
      const updatedItem = {
        ...item,
        gender: item.gender || "Unknown",
        categories: item.categories || "Unknown",
      };

      const exists = state.items.some((w) => w.id === updatedItem.id);
      state.items = exists ? state.items.filter((w) => w.id !== updatedItem.id) : [...state.items, updatedItem];
    }
  }
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
