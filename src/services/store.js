// imports from modules
import { configureStore } from "@reduxjs/toolkit";

// import logger from 'redux-logger';

// import reducers
import { modalReducer } from "./modalSlice";
import { orderReducer } from "./orderSlice";
import { burgerReducer } from "./burgerSlice";
import { ingredientsReducer } from "./ingredientsSlice";


export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    modal: modalReducer,
    order: orderReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
});
