const config = {
  baseUrl: 'https://norma.nomoreparties.space/api/',
  headers: {
    'Content-Type': 'application/json',
  },
};

function requestApi(endPoint, options) {
  const method = options.method;
  const headers = config.headers;

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
  return requestApi('ingredients', {
    method: 'GET',
  });
};

export function requestOrder(ingredients) {
  return requestApi('orders', {
    method: 'POST',
    data: {
      ingredients,
    },
  });
};

export function requestForgotPassword({ email }) {
  return requestApi('password-reset', {
    method: 'POST',
    data: {
      email,
    },
  });
};

export function requestResetPassword({ password, code }) {
  return requestApi('password-reset/reset', {
    method: 'POST',
    data: {
      password,
      code,
    },
  });
};


export function requestRegister({ email, password, name }) {
  return requestApi('auth/register', {
    method: 'POST',
    data: {
      email,
      password,
      name,
    },
  })
}

export function requestLogin({ email, password }) {
  return requestApi('auth/login', {
    method: 'POST',
    data: {
      email,
      password,
    },
  });
}
