import { configureStore } from "@reduxjs/toolkit";
// import logger from 'redux-logger';

import { ingredientsReducer } from "./ingredientsSlice";
import { modalReducer } from "./modalSlice";

import { burgerReducer } from "./burgerSlice";


const preloadedState = {
  ingredients: {
    loaded: [],
    isLoaded: false,
    loadingHasError: false,
    errorMessage: '',
  },
  burger: {
    ingredients: [],
  },
  modal: {
    type: '',
    isActive: false,
    currentIngredient: {},
    ingredientsIdList: [],
    orderNumber: 0,
    loadingSpinner: false,
  }
}

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    modal: modalReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
  preloadedState,
});
