import { createSlice } from '@reduxjs/toolkit';
import { WS_ACTIONS } from '../utils/constants';

export const ordersActions = {
  wsInit: WS_ACTIONS.ordersWsInit,
  onStop: WS_ACTIONS.ordersWsStop,
};

const initialState = {
  wsConnectionStatus: '',
  success: '',
  error: '',
  orders: [],
};

const ordersSlice = createSlice({
  name: '@@orders',
  initialState: initialState,
  reducers: {
    setWsConnectionStatus: (state, action) => {
      return {
        ...state,
        wsConnectionStatus: action.payload,
      };
    },
    setError: (state, action) => {
      return {
        ...state,
        success: false,
        error: action.payload,
      };
    },
    setOrders: (state, action) => {
      return {
        ...state,
        success: action.payload.success,
        error: '',
        orders: action.payload.orders,
      };
    },
  },
});

export const { setWsConnectionStatus, setError, setOrders } =
  ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
