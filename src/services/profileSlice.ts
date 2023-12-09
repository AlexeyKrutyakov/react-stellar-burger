// import from modules
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import constants
import { TOKENS, WS_ACTIONS } from '../utils/constants';
// import utils
import {
  requestLogin,
  requestNewTokens,
  requestLogout,
  requestRegistration,
  requestUserInfoWithRefreshTokens,
  requestEditUserWithRefreshTokens,
} from '../utils/api';
// import types
import { AppDispatch, Profile, User, requestNewTokensResponse } from 'types';

export const profileOrdersActions = {
  wsInit: WS_ACTIONS.ordersWsInit,
  onStop: WS_ACTIONS.ordersWsStop,
};

const initialState: Profile = {
  isAuthChecked: false,
  user: null,
  status: '',
  success: false,
  requestHasError: false,
  wsConnectionStatus: '',
  orders: null,
  errorMessage: '',
};

const rejectedStatus = {
  status: 'rejected',
  requestHasError: true,
};

const noErrors = {
  requestHasError: false,
  errorMessage: '',
};

export const getUser = () => {
  return async (dispatch: AppDispatch) => {
    const res = await requestUserInfoWithRefreshTokens();
    dispatch(setUser(res.user));
  };
};

export const editUser = (user: User) => {
  return async (dispatch: AppDispatch) => {
    const res = await requestEditUserWithRefreshTokens(user);
    dispatch(setUser(res.user));
  };
};

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem(TOKENS.names.access)) {
      dispatch(getUser())
        .catch((err: any) => {
          dispatch(setProfileError(err));
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const refreshTokens = () => {
  return async (dispatch: AppDispatch) => {
    const response = await requestNewTokens(); //todo dispatch ?

    if (response)
      try {
        return dispatch(setNewTokens(response));
      } catch {
        (err: string) => console.log(err);
      }
  };
};

export const register = createAsyncThunk(
  '@@profile/fetchRegister',
  requestRegistration,
);

export const login = createAsyncThunk('@@profile/fetchLogin', requestLogin);
export const logout = createAsyncThunk('@@profile/fetchLogout', requestLogout);

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
    setProfileError: (state, action) => {
      return {
        ...state,
        status: 'error catched',
        requestHasError: true,
        errorMessage: action.payload,
      };
    },
    setNewTokens: (_, action: PayloadAction<requestNewTokensResponse>) => {
      localStorage.setItem(TOKENS.names.access, action.payload.accessToken);
      localStorage.setItem(TOKENS.names.refresh, action.payload.refreshToken);
    },
    setProfileOrdersWsConnectionStatus: (state, action) => {
      return {
        ...state,
        wsConnectionStatus: action.payload,
      };
    },
    setOrders: (state, action) => {
      return {
        ...state,
        success: action.payload.success,
        error: '',
        orders: action.payload.orders,
      };
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
          ...noErrors,
          status: 'new user successfuly created',
          user: {
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
      .addCase(login.pending, state => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        return {
          ...state,
          ...noErrors,
          status: 'Successful login',
          user: {
            email: action.payload.user.email,
            name: action.payload.user.name,
          },
        };
      })
      .addCase(login.rejected, (state, action) => {
        return {
          ...state,
          ...rejectedStatus,
          errorMessage: action.error.message,
        };
      })
      .addCase(logout.pending, state => {
        state.status = 'pending';
      })
      .addCase(logout.fulfilled, (state, action) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return {
          ...state,
          ...noErrors,
          user: null,
          status: action.payload.message,
        };
      })
      .addCase(logout.rejected, (state, action) => {
        return {
          ...state,
          ...rejectedStatus,
          errorMessage: action.error.message,
        };
      });
  },
});

export const {
  setNewTokens,
  setProfileOrdersWsConnectionStatus,
  setOrders,
  setUser,
  setAuthChecked,
  setProfileError,
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
