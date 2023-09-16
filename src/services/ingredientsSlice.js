// imports from modules
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import utils
import { requestIngredients } from "../utils/api";

export const loadIngredients = createAsyncThunk(
  '@@ingredients/fetchIngredients',
  requestIngredients
);

const ingredientsSlice = createSlice({
  name: '@@ingredients',
  initialState: null,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadIngredients.pending, state => {
        state.isLoaded = 'false';
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        return {
          ...state,
          loaded: action.payload.data,
          isLoaded: true
        }
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        return {
          ...state,
          isLoaded: false,
          loadingHasError: true,
          errorMessage: action.error.message,
        }
      });
  }
});

export const {
  saveIngredients,
  saveError
} = ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;
