import { createSlice } from '@reduxjs/toolkit';
import { WS_ACTIONS } from '../utils/constants';

export const feedActions = {
  wsInit: WS_ACTIONS.feedWsInit,
  onStop: WS_ACTIONS.feedWsStop,
};

const initialState = {
  wsConnectionStatus: '',
  success: false,
  orders: [],
  errorMessage: '',
  total: 0,
  totalToday: 0,
};

const feedSlice = createSlice({
  name: '@@feed',
  initialState: initialState,
  reducers: {
    setFeedWsConnectionStatus: (state, action) => {
      return {
        ...state,
        wsConnectionStatus: action.payload,
      };
    },
    setFeedWsError: (state, action) => {
      return {
        ...state,
        success: false,
        errorMessage: action.payload,
      };
    },
    setFeed: (state, action) => {
      return {
        ...state,
        success: action.payload.success,
        errorMessage: '',
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    },
  },
});

export const { setFeedWsConnectionStatus, setFeedWsError, setFeed } =
  feedSlice.actions;

export const feedReducer = feedSlice.reducer;
