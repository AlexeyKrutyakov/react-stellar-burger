// imports from modules
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import utils
import { requestOrder } from "../utils/api";

export const submitOrder = createAsyncThunk(
  '@@order/submitOrder',
  requestOrder
);


const orderSlice = createSlice({
  name: '@@order',
  initialState: null,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(submitOrder.pending, state => {
        state.status = 'loading';
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'loaded',
          number: action.payload.order.number,
          name: action.payload.name,
        }
      })
      .addCase(submitOrder.rejected, state => {
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
