// imports from modules
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import utils
import { requestIngredients } from '../utils/api';
import {
  StoreIngredients,
  ResponseIngredients,
  requestIngredientsResponse,
} from 'types';

export const loadIngredients = createAsyncThunk<
  requestIngredientsResponse,
  undefined,
  { state: { ingredients: StoreIngredients } }
>('@@ingredients/fetchIngredients', async () => {
  const response = await requestIngredients();
  return response;
});

const initialState: StoreIngredients = {
  loaded: null,
  status: '',
  loadingHasError: false,
  errorMessage: '',
};

const ingredientsSlice = createSlice({
  name: '@@ingredients',
  initialState,
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
        };
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        return {
          ...state,
          status: 'rejected',
          loadingHasError: true,
          errorMessage: action.error.message,
        };
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;
