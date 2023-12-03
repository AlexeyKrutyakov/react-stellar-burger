// import constants
import {
  RequestOptions,
  User,
  requestEditUserResponse,
  requestGetOrderResponse,
  requestGetUserInfoResponse,
  requestLoginResponse,
  requestLogoutResponse,
  requestNewTokensResponse,
  requestOrderResponse,
  requestRegistrationResponse,
  requestResetPasswordResponse,
  requestResetTokenResponse,
} from 'types';
import { API_URLS, TOKENS } from './constants';

const config = {
  baseUrl: API_URLS.https,
  headers: {
    'Content-Type': 'application/json',
  },
};

function requestApi<T>(endPoint: string, options: RequestOptions): Promise<T> {
  const method = options.method;
  let headers = config.headers;

  if (options.headers) {
    headers = {
      ...config.headers,
      ...options.headers,
    };
  }

  switch (method) {
    case 'GET':
      return request(endPoint, {
        method,
        headers,
      }) as Promise<T>;
    case 'POST':
      return request(endPoint, {
        method,
        headers,
        body: JSON.stringify({
          ...options.body,
        }),
      }) as Promise<T>;
    case 'PATCH':
      return request(endPoint, {
        method,
        headers,
        body: JSON.stringify({
          ...options.body,
        }),
      }) as Promise<T>;
    default:
      return Promise.reject(
        `Error: unknown request method '${options.method}'`,
      );
  }
}

function request(endPoint: string, options: RequestOptions) {
  return fetch(`${config.baseUrl}${endPoint}`, options).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then(err => Promise.reject(err));
    }
  });
}

export function requestGetUserInfo() {
  return requestApi<requestGetUserInfoResponse>('auth/user', {
    method: 'GET',
    headers: {
      authorization: localStorage.getItem(TOKENS.names.access) as string,
    },
  });
}

export async function requestUserInfoWithRefreshTokens() {
  try {
    return await requestGetUserInfo();
  } catch (error) {
    if (error instanceof Error && error.message === 'jwt expired') {
      const refreshedTokens =
        (await requestNewTokens()) as requestNewTokensResponse;
      localStorage.setItem(TOKENS.names.access, refreshedTokens.accessToken);
      localStorage.setItem(TOKENS.names.refresh, refreshedTokens.refreshToken);
    }
    return await requestGetUserInfo();
  }
}

export async function requestEditUser({ name, email, password }: User) {
  return requestApi<requestEditUserResponse>('auth/user', {
    method: 'PATCH',
    headers: {
      authorization: localStorage.getItem(TOKENS.names.access) as string,
    },
    body: {
      name,
      email,
      password,
    },
  });
}

export async function requestEditUserWithRefreshTokens(user: User) {
  try {
    return await requestEditUser(user);
  } catch (error) {
    if (error instanceof Error && error.message === 'jwt expired') {
      const refreshedTokens =
        (await requestNewTokens()) as requestNewTokensResponse;
      localStorage.setItem(TOKENS.names.access, refreshedTokens.accessToken);
      localStorage.setItem(TOKENS.names.refresh, refreshedTokens.refreshToken);
    }
    return await requestEditUser(user);
  }
}

export function requestIngredients() {
  return requestApi('ingredients', {
    method: 'GET',
  });
}

export function requestOrder(ingredients: string[]) {
  return requestApi<requestOrderResponse>('orders', {
    method: 'POST',
    headers: {
      authorization: localStorage.getItem(TOKENS.names.access) as string,
    },
    body: { ingredients },
  });
}

export function requestResetToken({ email }: { email: string }) {
  return requestApi<requestResetTokenResponse>('password-reset', {
    method: 'POST',
    body: { email },
  });
}

export function requestResetPassword({
  password,
  token,
}: {
  password: string;
  token: string;
}) {
  return requestApi<requestResetPasswordResponse>('password-reset/reset', {
    method: 'POST',
    body: { password, token },
  });
}

export function requestRegistration({ email, password, name }: User) {
  return requestApi<requestRegistrationResponse>('auth/register', {
    method: 'POST',
    body: { email, password, name },
  });
}

export function requestLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return requestApi<requestLoginResponse>('auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export function requestLogout() {
  return requestApi<requestLogoutResponse>('auth/logout', {
    method: 'POST',
    body: {
      token: localStorage.getItem(TOKENS.names.refresh),
    },
  });
}

export function requestNewTokens() {
  return requestApi<requestNewTokensResponse>('auth/token', {
    method: 'POST',
    body: {
      token: localStorage.getItem(TOKENS.names.refresh),
    },
  });
}

export function requestGetOrder(number: string) {
  return requestApi<requestGetOrderResponse>(`orders/${number}`, {
    method: 'GET',
  });
}
