import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alertMessage: null,
  alertType: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.alertMessage = action.payload.message;
      state.alertType = action.payload.type;
    },
    clearNotification: (state) => {
      state.alertMessage = null;
      state.alertType = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
