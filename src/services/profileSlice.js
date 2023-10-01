import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { requestResetToken, requestGetUserInfo, requestLogin, requestResetPassword, requestNewTokens, requestLogout } from "../utils/api";
import { deleteCookie, getCookie, setCookie } from "../utils/cookies";
import { COOKIES } from "../utils/constants";
import addScheme from "../utils/add-scheme";
import removeScheme from "../utils/remove-scheme";

const accessTokenName = COOKIES.tokens.names.access;
const refreshTokenName = COOKIES.tokens.names.refresh;

const accessToken = addScheme('Bearer', getCookie(accessTokenName));

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

// export const register = createAsyncThunk(
//   '@@profile/fetchRegister',
//   requestRegister
// );

export const login = createAsyncThunk(
  '@@profile/fetchLogin',
  requestLogin
);

export const logout = createAsyncThunk(
  '@@profile/fetchLogout',
  requestLogout
);

export const getUserInfo = createAsyncThunk(
  '@@profile/fetchUserInfo',
  requestGetUserInfo
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
        const accessToken = removeScheme('Bearer', action.payload.accessToken);
        const refreshToken = action.payload.refreshToken;
        const userEmail = action.payload.user.email;
        const userName = action.payload.user.name;

        setCookie(accessTokenName, accessToken);
        setCookie(refreshTokenName, refreshToken);

        return {
          ...state,
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: {
            email: userEmail,
            name: userName,
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
        deleteCookie(accessTokenName);
        deleteCookie(refreshTokenName);
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
      .addCase(getUserInfo.pending, state => {
        state.status = 'pending';
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        return {
          ...state,
          user: {
              email: action.payload.user.email,
              name: action.payload.user.name,
            },
            status: 'user info successful loaded',
            requestHasError: false,
            errorMessage: '',
          }
        })
        .addCase(getUserInfo.rejected, (state, action) => {
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
        const newAccessToken = removeScheme('Bearer', action.payload.accessToken);
        const newRefreshToken = action.payload.refreshToken;

        setCookie(accessTokenName, newAccessToken, { expires: (60 * 20) });
        setCookie(refreshTokenName, newRefreshToken);
        
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
