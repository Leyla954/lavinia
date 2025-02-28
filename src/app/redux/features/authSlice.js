import { createSlice } from '@reduxjs/toolkit';

const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: storedUser ? true : false,
};

const loadUserFromStorage = () => {
  if (typeof window !== 'undefined') {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  }
  return null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: loadUserFromStorage(), isAuthenticated: !!loadUserFromStorage() },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer
