import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDessing = createAsyncThunk('dessing/fetchDessing', async () => {
  const response = await fetch('https://67acb9903f5a4e1477dba29c.mockapi.io/dessing');
  if (!response.ok) {
    throw new Error('Failed to fetch dessing data');
  }
  return await response.json();
});

const dessingSlice = createSlice({
  name: 'dessing',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDessing.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDessing.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDessing.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dessingSlice.reducer;
