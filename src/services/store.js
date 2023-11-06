// imports from modules
import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './socketMiddleWare';

// import services
import { modalReducer } from './modalSlice';
import { orderReducer } from './orderSlice';
import { burgerReducer } from './burgerSlice';
import {
  profileOrdersActions,
  profileReducer,
  setOrders,
  setProfileError,
  setProfileOrdersWsConnectionStatus,
} from './profileSlice';
import { ingredientsReducer } from './ingredientsSlice';
import { feedReducer } from './feedSlice';
import {
  feedActions,
  setFeedWsConnectionStatus,
  setFeedWsError,
  setFeed,
} from './feedSlice';

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    order: orderReducer,
    modal: modalReducer,
    profile: profileReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      socketMiddleware({
        wsInit: feedActions.wsInit,
        onOpen: setFeedWsConnectionStatus,
        onStop: feedActions.onStop,
        onError: setFeedWsError,
        onClose: setFeedWsConnectionStatus,
        onMessage: setFeed,
      }),
      socketMiddleware({
        wsInit: profileOrdersActions.wsInit,
        onOpen: setProfileOrdersWsConnectionStatus,
        onStop: profileOrdersActions.onStop,
        onError: setProfileError,
        onClose: setProfileOrdersWsConnectionStatus,
        onMessage: setOrders,
      }),
    ),
  devTools: true,
});
