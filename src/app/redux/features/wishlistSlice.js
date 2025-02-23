import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

// LocalStorage-dan wishlist məlumatlarını yükləmək
const loadWishlist = () => {
  if (typeof window !== "undefined") {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  }
  return [];
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlist(), // Yadda qalan wishlist
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);

      if (index === -1) {
        state.items.push(product);
        message.success("Məhsul seçilmişlərə əlavə edildi!");
      } else {
        state.items.splice(index, 1);
        message.warning("Məhsul seçilmişlərdən silindi!");
      }

      // LocalStorage-a yadda saxlamaq
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
