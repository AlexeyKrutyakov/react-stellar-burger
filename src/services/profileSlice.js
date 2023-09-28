import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { requestForgotPassword, requestLogin, requestResetPassword } from "../utils/api";

export const getResetToken = createAsyncThunk(
  '@@profile/fetcResetToken',
  requestForgotPassword
);
export const resetPassword = createAsyncThunk(
  '@@profile/fetchResetPassword',
  requestResetPassword
);

// export const register = createAsyncThunk(
//   '@@profile/fetchRegister',
//   requestRegister
// );

export const login = createAsyncThunk(
  '@@profile/fetchLogin',
  requestLogin
);

const initialState = {
  accessToken: '',
  refreshToken: '',
  user: {
    email: '',
    name: '',
  },
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
        };
      })
      .addCase(resetPassword.pending, state => {
        state.status = 'pending';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        return {
          ...state,
          status: action.payload.message,
          requestHasError: false,
          errorMessage: '',
        };
      })
      .addCase(resetPassword.rejected, (state, action) => {
        console.log('slice state', state);
        console.log('slice action', action);
        return {
          ...state,
          status: 'rejected',
          requestHasError: true,
          errorMessage: action.error.message,
        };
      })
      .addCase(login.pending, state => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        return {
          ...state,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          user: {
            email: action.payload.user.email,
            name: action.payload.user.name,
          },
          status: 'logged in successful',
          requestHasError: false,
          errorMessage: '',

        };
      })
      .addCase(login.rejected, (state, action) => {
        return {
          ...state,
          status: 'rejected',
          requestHasError: true,
          errorMessage: action.error.message,
        };
      });
  }
});

export const profileReducer = profileSlice.reducer;
