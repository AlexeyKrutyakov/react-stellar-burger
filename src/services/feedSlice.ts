import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WS_ACTIONS } from '../utils/constants';
import { Feed } from 'types';

export const feedActions = {
  wsInit: WS_ACTIONS.feedWsInit,
  onStop: WS_ACTIONS.feedWsStop,
};

const initialState: Feed = {
  wsConnectionStatus: '',
  success: false,
  orders: [],
  errorMessage: '',
  total: 0,
  totalToday: 0,
};

const feedSlice = createSlice({
  name: '@@feed',
  initialState,
  reducers: {
    setFeedWsConnectionStatus: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        wsConnectionStatus: action.payload,
      };
    },
    setFeedWsError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        success: false,
        errorMessage: action.payload,
      };
    },
    setFeed: (state, action: PayloadAction<Feed>) => {
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
