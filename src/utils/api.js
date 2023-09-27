const config = {
  baseUrl: 'https://norma.nomoreparties.space/api/',
  headers: {
    'Content-Type': 'application/json',
  },
};

function requestApi(endPoint, options) {
  if (options.method === 'GET'
  || options.method ==='POST') {
    return request(endPoint, options);
  } else return new Error(`Error: unknown request method '${options.method}'`);
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
    headers: config.headers,
  });
};

export function requestOrder(idList) {
  return requestApi('orders', {
    method: 'POST',
    body: JSON.stringify({
      'ingredients': idList
    }),
    headers: config.headers,
  });
};

export function requestForgotPassword({ email }) {
  return requestApi('password-reset', {
    method: 'POST',
    body: JSON.stringify({
      'email': email,
    }),
    headers: config.headers,
  });
};

export function requestResetPassword({ password, code }) {
  console.log('password in api', password);
  console.log('token in api', code);
  return requestApi('password-reset/reset', {
    method: 'POST',
    body: JSON.stringify({
      'password': password,
      'token': code,
    }),
    headers: config.headers,
  });
};
