const config = {
  baseUrl: 'https://norma.nomoreparties.space/api/',
  headers: {
    'Content-Type': 'application/json',
  },
};

function requestApi(endPoint, options, token='') {
  const method = options.method;
  const headers = config.headers;

  switch (method) {
    case 'GET':
      return request(endPoint, {
        method,
        headers: {
          ...headers,
          Authorization: token,
        },
      });
    case 'POST':
      return request(endPoint, {
        method,
        headers: {
          ...headers,
          Authorization: token,
        },
        body: JSON.stringify({
          ...options.data,
        }),
      })
    default:
      return new Error(`Error: unknown request method '${options.method}'`);
  };
};
      
function request(endPoint, options) {
  return fetch(`${config.baseUrl}${endPoint}`, options).then(checkResult);
};

function checkResult(res) {

  return res.ok ? res.json() : Promise.reject('requestApi error');
};

export function requestIngredients() {
  return requestApi(
    'ingredients',
    {
      method: 'GET',
    },
  );
};

export function requestOrder(ingredients) {
  return requestApi(
    'orders',
    {
      method: 'POST',
      data: { ingredients },
    },
  );
};

export function requestResetToken({ email }) {
  return requestApi(
    'password-reset',
    {
      method: 'POST',
      data: { email },
    },
  );
};

export function requestResetPassword({ password, code }) {
  return requestApi(
    'password-reset/reset',
    {
      method: 'POST',
      data: { password, code },
    },
  );
};


export function requestRegistration({ email, password, name }) {
  return requestApi(
    'auth/register',
    {
      method: 'POST',
      data: { email, password, name },
    },
  );
};

export function requestLogin({ email, password }) {
  return requestApi(
    'auth/login',
    {
      method: 'POST',
      data: { email, password },
    },
  );
};

export function requestLogout(token) {
  return requestApi(
    'auth/logout',
    {
      method: 'POST',
      data: { token },
    },
  );
};

export function requestNewTokens(token) {
  return requestApi(
    'auth/token',
    {
      method: 'POST',
      data: { token },
    },
  );
};

export function requestGetUserInfo(token) {
  return requestApi(
    'auth/user',
    {
      method: 'GET',
    },
    token,
  );
};
