`use client`;
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import wishlistReducer from './features/wishlistSlice';

export const store = configureStore({
    reducer:{
        counter: productReducer,
        wishlist: wishlistReducer,
    }
})