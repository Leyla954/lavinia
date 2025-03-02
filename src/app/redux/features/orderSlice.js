import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await fetch("https://67acb9903f5a4e1477dba29c.mockapi.io/orders");
  return response.json();
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
