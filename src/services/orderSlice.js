import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchOrder = createAsyncThunk();

const orderSlice = createSlice({
  name: '@@order',
  initialState: null,
  reducers: {
    getOrder: (state, action) => {

    }
  }
});

export const { getOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
