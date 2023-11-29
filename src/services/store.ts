// imports from modules
import { combineReducers, configureStore } from '@reduxjs/toolkit';
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

export const rootReducer = combineReducers({
  feed: feedReducer,
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  modal: modalReducer,
  profile: profileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
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
