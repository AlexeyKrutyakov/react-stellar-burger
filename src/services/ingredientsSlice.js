// imports from modules
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import utils
import { requestIngredients } from "../utils/api";

export const loadIngredients = createAsyncThunk(
  '@@ingredients/fetchIngredients',
  requestIngredients
);

const initialState = {
  loaded: null,
  status: '',
  loadingHasError: false,
  errorMessage: '',
};

const ingredientsSlice = createSlice({
  name: '@@ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadIngredients.pending, state => {
        state.status = 'pending';
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        return {
          ...state,
          loaded: action.payload.data,
          status: 'loaded',
        }
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        return {
          ...state,
          status: 'rejected',
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
