import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  requestResetToken,
  requestLogin,
  requestResetPassword,
  requestNewTokens,
  requestLogout,
  requestRegistration,
  requestUserInfoWithRefreshTokens
} from "../utils/api";
import { TOKENS } from "../utils/constants";

const rejectedStatus = {
  status: 'rejected',
  requestHasError: true,
}

export const getUser = () => {
  return (dispatch) => {
    return requestUserInfoWithRefreshTokens()
      .then(res => {
        dispatch(setUser(res.user));
      });
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem(TOKENS.names.access)) {
      dispatch(getUser())
        .catch((err) => {
          dispatch(setError(err));
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
        localStorage.setItem(TOKENS.names.access, action.payload.accessToken);
        localStorage.setItem(TOKENS.names.refresh, action.payload.refreshToken);
        return {
          ...state,
          user: {
            status: action.payload.message,
            email: action.payload.user.email,
            name: action.payload.user.name,
          },
        };
      })
      .addCase(register.rejected, (state, action) => {
        return {
          ...state,
          ...rejectedStatus,
          errorMessage: action.error.message,
        };
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
          ...rejectedStatus,
          errorMessage: action.error.message,
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
          ...rejectedStatus,
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
          ...rejectedStatus,
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
          ...rejectedStatus,
          errorMessage: action.error.message,
        }
      })
      .addCase(getNewTokens.pending, state => {
        state.status = 'pending';
      })
      .addCase(getNewTokens.fulfilled, (state, action) => {
        const newAccessToken = action.payload.accessToken;
        const newRefreshToken = action.payload.refreshToken;
        localStorage.setItem(TOKENS.names.access, newAccessToken);
        localStorage.setItem(TOKENS.names.refresh, newRefreshToken);
        return {
          ...state,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        }
      })
      .addCase(getNewTokens.rejected, (state, action) => {
        return {
          ...state,
          ...rejectedStatus,
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
