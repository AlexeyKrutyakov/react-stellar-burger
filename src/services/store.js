import { configureStore } from "@reduxjs/toolkit";
// import logger from 'redux-logger';

import { ingredientsReducer } from "./ingredientsSlice";
import { modalReducer } from "./modalSlice";
import { burgerReducer } from "./burgerSlice";
import { orderReducer } from "./orderSlice";


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
  },
  order: {
    number: 0,
    name: '',
    ingredientsIdList: [],
  }
}

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    modal: modalReducer,
    order: orderReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
  preloadedState,
});
