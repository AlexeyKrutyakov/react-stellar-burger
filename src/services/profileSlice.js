// import from modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const profileOrdersActions = {
  wsInit: WS_ACTIONS.ordersWsInit,
  onStop: WS_ACTIONS.ordersWsStop,
};

const initialState = {
  isAuthChecked: false,
  user: null,
  status: '',
  success: false,
  requestHasError: false,
  errorMessage: '',
  wsConnectionStatus: '',
  orders: null,
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
  return dispatch => {
    return requestUserInfoWithRefreshTokens().then(res => {
      dispatch(setUser(res.user));
    });
  };
};

export const editUser = user => {
  return dispatch => {
    return requestEditUserWithRefreshTokens(user).then(res => {
      dispatch(setUser(res.user));
    });
  };
};

export const checkUserAuth = () => {
  return dispatch => {
    if (localStorage.getItem(TOKENS.names.access)) {
      dispatch(getUser())
        .catch(err => {
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
  return dispatch => {
    dispatch(requestNewTokens(localStorage.getItem(TOKENS.names.refresh)))
      .then(res => dispatch(setNewTokens(res)))
      .catch(err => {
        dispatch(setError(err));
      });
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
    setNewTokens: action => {
      localStorage.setItem(TOKENS.names.access, action.accessToken);
      localStorage.setItem(TOKENS.names.refresh, action.refreshToken);
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
      .addCase(logout, state => {
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
