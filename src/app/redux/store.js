import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import wishlistReducer from './features/wishlistSlice';
import cartReducer from './features/cartSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});
