import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { submitOrder } from "../utils/api";

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (ingredientsIdList) => {
    const orderData = await submitOrder(ingredientsIdList);
    return orderData;
  }
);

const orderSlice = createSlice({
  name: '@@order',
  initialState: null,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrder.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'loaded',
          number: action.payload.order.number,
          name: action.payload.name,
        }
      })
      .addCase(fetchOrder.rejected, state => {
        return {
          ...state,
          status: 'rejected',
          number: 0,
          name: '',
        }
      });
  }
});

export const orderReducer = orderSlice.reducer;
