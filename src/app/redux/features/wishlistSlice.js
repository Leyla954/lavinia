import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const storedWishlist = localStorage.getItem('wishlist');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      return [];
    }
  }
  return [];
};

const saveWishlistToLocalStorage = (wishlist) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }
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
        state.items.push({ id: item.id, title: item.title, image: item.image, price: item.price });
      }

      saveWishlistToLocalStorage(state.items);
    },
    syncWishlistWithLocalStorage: (state) => {
      state.items = loadWishlistFromLocalStorage();
    }
  }
});

export const { toggleWishlist, syncWishlistWithLocalStorage } = wishlistSlice.actions;
export default wishlistSlice.reducer;
