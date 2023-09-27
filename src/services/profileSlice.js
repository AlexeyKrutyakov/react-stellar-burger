import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { requestForgotPassword, requestResetPassword } from "../utils/api";

export const getResetToken = createAsyncThunk(
  '@@profile/fetcResetToken',
  requestForgotPassword
);
export const resetPassword = createAsyncThunk(
  '@@profile/fetchResetPassword',
  requestResetPassword
);

const initialState = {
  token: '',
  status: '',
  requestHasError: false,
  errorMessage: '',
};

const profileSlice = createSlice({
  name: '@@profile',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getResetToken.pending, state => {
        state.status = 'pending';
      })
      .addCase(getResetToken.fulfilled, (state, action) => {
        state.status = action.payload.message;
      })
      .addCase(getResetToken.rejected, (state, action) => {
        return {
          ...state,
          status: 'rejected',
          requestHasError: true,
          errorMessage: action.payload.error.message,
        }
      })
      .addCase(resetPassword.pending, state => {
        state.status = 'pending';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        console.log(action.payload);
        return {
          ...state,
          status: 'rejected',
          requestHasError: true,
          // errorMessage: action.payload,
        }
      });
  }
});

export const profileReducer = profileSlice.reducer;
