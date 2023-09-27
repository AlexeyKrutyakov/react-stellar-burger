import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { requestPasswordForgot } from "../utils/api";

export const requestResetToken = createAsyncThunk(
  '@@profile/fetcResetPassword',
  requestPasswordForgot
);

const initialState = {
  login: '',
  email: '',
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
      .addCase(requestResetToken.pending, state => {
        state.status = 'pending';
      })
      .addCase(requestResetToken.fulfilled, (state, action) => {
        state.status = action.payload.message;
      })
      .addCase(requestResetToken.rejected, (state, action) => {
        return {
          ...state,
          status: 'rejected',
          requestHasError: true,
          errorMessage: action.payload.error.message,
        }
      });
  }
});

export const profileReducer = profileSlice.reducer;
