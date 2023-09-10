import { createSlice } from "@reduxjs/toolkit";

const burgerSlice = createSlice({
  name: '@@burger',
  initialState: null,
  reducers: {
    addIngredient: (state, action) => {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      }
    }
  }
});

export const {
  addIngredient,
} = burgerSlice.actions;

export const burgerReducer = burgerSlice.reducer;
