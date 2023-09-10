import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';

import { ingredientsReducer } from "./ingredientsSlice";
import { modalReducer } from "./modalSlice";

import { data } from "../utils/data";


const preloadedState = {
  ingredients: {
    loaded: [],
    isLoaded: false,
    loadingHasError: false,
    errorMessage: '',
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
    modal: modalReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
  preloadedState,
});
