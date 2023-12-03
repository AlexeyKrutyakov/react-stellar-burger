// imports from modules
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import utils
import { requestGetOrder, requestOrder } from '../utils/api';
import { Order, responseGetOrderByNumber, responseSubmitOrder } from 'types';
import { AppDispatch } from 'types';

export const submitOrder = createAsyncThunk<
  responseSubmitOrder,
  string[],
  { state: { order: Order } }
>('@@order/submitOrder', async ingredients => {
  const response = await requestOrder(ingredients);
  return response;
});

const initialState: Order = {
  _id: '',
  ingredients: [],
  owner: '',
  status: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  number: null,
  __v: 0,
};

export const getOrderFromServer = (number: string) => {
  return async (dispatch: AppDispatch) => {
    const response = (await requestGetOrder(
      number,
    )) as responseGetOrderByNumber;
    return dispatch(setOrder(response));
  };
};

const orderSlice = createSlice({
  name: '@@order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<responseGetOrderByNumber>) => {
      const data = action.payload.orders[0];
      return {
        ...state,
        _id: data._id,
        ingredients: data.ingredients,
        owner: data.owner,
        status: data.status,
        name: data.name,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        number: data.number,
        __v: data.__v,
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
          number: null,
          name: '',
        };
      });
  },
});

export const { setOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
