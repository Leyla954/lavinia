import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  }
  return [];
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: loadWishlistFromLocalStorage() },
  reducers: {
    toggleWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.items.some((w) => w.id === item.id);

      if (exists) {
        state.items = state.items.filter((w) => w.id !== item.id);
      } else {
        state.items.push(item);
      }

      localStorage.setItem('wishlist', JSON.stringify(state.items)); // Yenilənmiş datanı yadda saxla
    },
    syncWishlistWithLocalStorage: (state) => {
      state.items = loadWishlistFromLocalStorage();
    }
  }
});

export const { toggleWishlist, syncWishlistWithLocalStorage } = wishlistSlice.actions;
export default wishlistSlice.reducer;
