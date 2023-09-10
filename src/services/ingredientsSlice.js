import { createSlice } from "@reduxjs/toolkit";

const ingredientsSlice = createSlice({
  name: '@@ingredients',
  initialState: null,
  reducers: {
    loadIngredients: (state, _) => {
      return {
        ...state,
        isLoaded: false
      }
    },
    saveIngredients: (state, action) => {
      return {
        ...state,
        loaded: action.payload,
        isLoaded: true
      }
    },
    saveError: (state, action) => {
      return {
        ...state,
        loadingHasError: action.payload.hasError,
        errorMessage: action.payload.message
      }
    }
  }
});

export const {
  loadIngredients,
  saveIngredients,
  saveError
} = ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;
