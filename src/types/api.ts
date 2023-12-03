import { Ingredient } from './ingredients';
import { Order } from './order';

export type RequestOptions = {
  method: requestMethod;
  headers?: requestHeaders;
  body?: any;
};

type requestHeaders = {
  'Content-Type'?: string;
  authorization?: string;
};

type requestMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

export type RequestIngredientsResponse = {
  success: boolean;
  data: Ingredient[];
};

export type requestGetUserInfoResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type requestEditUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type requestOrderResponse = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type requestResetTokenResponse = {
  success: boolean;
  message: string;
};

export type requestResetPasswordResponse = {
  success: boolean;
  message: string;
};

export type requestRegistrationResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type requestLoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
};

export type requestLogoutResponse = {
  success: boolean;
  message: string;
};

export type requestNewTokensResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type requestGetOrderResponse = {
  success: boolean;
  orders: Order[];
};
