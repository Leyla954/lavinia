import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import dessingReducer from './features/dessingSlice.js';
import wishlistReducer from './features/wishlistSlice';
import cartReducer from './features/cartSlice';
import notificationReducer from './features/notificationSlice';
import authReducer from "./features/authSlice";
import usersReducer from "./features/usersSlice";
import ordersReducer from "./features/orderSlice";
import adminReducer from './features/adminSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    dessing: dessingReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    notification: notificationReducer,
    auth: authReducer,
    users: usersReducer,
    orders: ordersReducer,
    admin: adminReducer,
  },
});
