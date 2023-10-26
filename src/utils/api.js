// import constants
import { API_URLS, TOKENS } from './constants';

const config = {
  baseUrl: API_URLS.https,
  headers: {
    'Content-Type': 'application/json',
  },
};

function requestApi(endPoint, options) {
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
      });
    case 'POST':
      return request(endPoint, {
        method,
        headers,
        body: JSON.stringify({
          ...options.body,
        }),
      });
    case 'PATCH':
      return request(endPoint, {
        method,
        headers,
        body: JSON.stringify({
          ...options.body,
        }),
      });
    default:
      return new Error(`Error: unknown request method '${options.method}'`);
  }
}

function request(endPoint, options) {
  return fetch(`${config.baseUrl}${endPoint}`, options).then(checkResult);
}

function checkResult(res) {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export function requestGetUserInfo() {
  return requestApi('auth/user', {
    method: 'GET',
    headers: {
      authorization: localStorage.getItem(TOKENS.names.access),
    },
  });
}

export async function requestUserInfoWithRefreshTokens() {
  try {
    return await requestGetUserInfo();
  } catch (error) {
    if (error.message === 'jwt expired') {
      const refreshedTokens = await requestNewTokens();
      localStorage.setItem(TOKENS.names.access, refreshedTokens.accessToken);
      localStorage.setItem(TOKENS.names.refresh, refreshedTokens.refreshToken);
    }
    return await requestGetUserInfo();
  }
}

export async function requestEditUser({ name, email, password }) {
  return requestApi('auth/user', {
    method: 'PATCH',
    headers: {
      authorization: localStorage.getItem(TOKENS.names.access),
    },
    body: {
      name,
      email,
      password,
    },
  });
}

export async function requestEditUserWithRefreshTokens(user) {
  try {
    return await requestEditUser(user);
  } catch (error) {
    if (error.message === 'jwt expired') {
      const refreshedTokens = await requestNewTokens();
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

export function requestOrder(ingredients) {
  return requestApi('orders', {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem(TOKENS.names.access),
    },
    body: { ingredients },
  });
}

export function requestResetToken({ email }) {
  return requestApi('password-reset', {
    method: 'POST',
    body: { email },
  });
}

export function requestResetPassword({ password, token }) {
  return requestApi('password-reset/reset', {
    method: 'POST',
    body: { password, token },
  });
}

export function requestRegistration({ email, password, name }) {
  return requestApi('auth/register', {
    method: 'POST',
    body: { email, password, name },
  });
}

export function requestLogin({ email, password }) {
  return requestApi('auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export function requestLogout() {
  return requestApi('auth/logout', {
    method: 'POST',
    body: {
      token: localStorage.getItem(TOKENS.names.refresh),
    },
  });
}

export function requestNewTokens() {
  return requestApi('auth/token', {
    method: 'POST',
    body: {
      token: localStorage.getItem(TOKENS.names.refresh),
    },
  });
}

export function requestGetOrder(number) {
  return requestApi(`orders/${number}`, {
    method: 'GET',
  });
}
