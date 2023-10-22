// imports from modules
import { configureStore } from '@reduxjs/toolkit';
import { wsMiddleware } from './wsMiddleware';

// import services
import { modalReducer } from './modalSlice';
import { orderReducer } from './orderSlice';
import { burgerReducer } from './burgerSlice';
import { profileReducer } from './profileSlice';
import { ingredientsReducer } from './ingredientsSlice';
import { feedReducer } from './feedSlice';
import {
  feedActions,
  setWsConnectionStatus,
  setError,
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      wsMiddleware({
        wsInit: feedActions.wsInit,
        onOpen: setWsConnectionStatus,
        onStop: feedActions.onStop,
        onError: setError,
        onClose: setWsConnectionStatus,
        onMessage: setFeed,
      })
    ),
  devTools: true,
});
