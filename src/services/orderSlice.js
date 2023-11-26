// imports from modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import utils
import { requestGetOrder, requestOrder } from '../utils/api';

export const submitOrder = createAsyncThunk(
  '@@order/submitOrder',
  requestOrder,
);

const initialState = {
  _id: '',
  ingredients: null,
  owner: '',
  status: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  number: null,
  __v: 0,
};

export const getOrderFromServer = number => {
  return dispatch => {
    return requestGetOrder(number).then(res => {
      dispatch(setOrder(res));
    });
  };
};

const orderSlice = createSlice({
  name: '@@order',
  initialState: initialState,
  reducers: {
    setOrder: (state, action) => {
      const data = action.payload.orders[0];
      return {
        ...state,
        id: data._id,
        ingredients: data.ingredients,
        status: data.status,
        name: data.name,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        number: data.number,
      };
    },
  },
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
        };
      })
      .addCase(submitOrder.rejected, state => {
        return {
          ...state,
          status: 'rejected',
          number: 0,
          name: '',
        };
      });
  },
});

export const { setOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
