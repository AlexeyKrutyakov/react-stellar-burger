import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  requestResetToken,
  requestGetUserInfo,
  requestLogin,
  requestResetPassword,
  requestNewTokens,
  requestLogout,
  requestRegistration
} from "../utils/api";

const accessToken = localStorage.getItem('accessToken');

export const getUser = () => {
  return (dispatch) => {
    return requestGetUserInfo(accessToken)
      .then(res => {
        dispatch(setUser(res.user));
      });
  };
};

export const checkUserAuth = () => {

  return (dispatch) => {
    if (accessToken) {
      dispatch(getUser())
        .catch(() => {
          dispatch(setError('error of user authentication'));
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const getResetToken = createAsyncThunk(
  '@@profile/fetcResetToken',
  requestResetToken
);
export const resetPassword = createAsyncThunk(
  '@@profile/fetchResetPassword',
  requestResetPassword
);

export const getNewTokens = createAsyncThunk(
  '@@profile/fetchNewAccessToken',
  requestNewTokens
);

export const register = createAsyncThunk(
  '@@profile/fetchRegister',
  requestRegistration
);

export const login = createAsyncThunk(
  '@@profile/fetchLogin',
  requestLogin
);

export const logout = createAsyncThunk(
  '@@profile/fetchLogout',
  requestLogout
);

const initialState = {
  isAuthChecked: false,
  user: null,
  status: '',
  requestHasError: false,
  errorMessage: '',
};

const profileSlice = createSlice({
  name: '@@profile',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setError: (state, action) => {
      return {
        ...state,
        status: 'error catched',
        requestHasError: true,
        errorMessage: action.payload,
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.status = 'pending';
      })
      .addCase(register.fulfilled, (state, action) => {
        const accessToken = action.payload.accessToken;
        const refreshToken = action.payload.refreshToken;

        localStorage.setItem('accessToken', `${accessToken}`)
        localStorage.setItem('refreshToken', refreshToken)

        return {
          ...state,
          user: {
            email: action.payload.user.email,
            name: action.payload.user.name,
          },
        };
      })
      .addCase(register.rejected, (state, action) => {

      })
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
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);

        return {
          ...state,
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
      })
      .addCase(logout, (state) => {
        state.status = 'pending';
      })
      .addCase(logout.fulfilled, (state, action) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        return {
          ...state,
          user: null,
          status: action.payload.message,
        }
      })
      .addCase(logout.rejected, (state, action) => {
        return {
          ...state,
          status: 'rejected',
          requestHasError: true,
          errorMessage: action.error.message,
        }
      })
      .addCase(getNewTokens.pending, state => {
        state.status = 'pending';
      })
      .addCase(getNewTokens.fulfilled, (state, action) => {
        const newAccessToken = action.payload.accessToken;
        const newRefreshToken = action.payload.refreshToken;

        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
                
        return {
          ...state,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        }
      })
      .addCase(getNewTokens.rejected, (state, action) => {
        return {
          ...state,
          status: 'rejected',
          requestHasError: true,
          errorMessage: action.error.message,
        }
      })
  }
});

export const {
  setUser,
  setAuthChecked,
  setError,
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
