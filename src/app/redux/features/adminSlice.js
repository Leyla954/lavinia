import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    loggedIn: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;
