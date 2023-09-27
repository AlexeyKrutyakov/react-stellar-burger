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

export function requestPasswordForgot(email) {
  return requestApi('password-reset', {
    method: 'POST',
    body: JSON.stringify({
      'email': email,
    }),
    headers: config.headers,
  });
};

export function resetPasswordReset(password, token) {
  return requestApi('password-reset/reset', {
    method: 'POST',
    body: JSON.stringify({
      'password': password,
      'token': token,
    }),
    headers: config.headers,
  });
};
