const config = {
  baseUrl: 'https://norma.nomoreparties.space/api/',
  headers: {
    'Content-Type': 'application/json',
  },
}

function requestApi(requestMethod, url, body={}) {
  switch (requestMethod) {
    case 'GET':
      return(
        fetch(url, {
          method: requestMethod,
          headers: config.headers,
        })
        .then(res => checkResult(res))
      );
    case 'POST':
      return(
        fetch(url, {
          method: requestMethod,
          headers: config.headers,
          body: JSON.stringify(body),
        })
        .then(res => checkResult(res))
      );
    default:
      return new Error(`Error: unknown request method '${requestMethod}'`);
  }
}

function checkResult(res) {
  return res.ok ? res.json() : Promise.reject('Error in checkResult: ', res.status);
}

export function getIngredients(){
  return requestApi('GET', `${config.baseUrl}ingredients`);
}

export function submitOrder(body) {
  return requestApi('POST',  `${config.baseUrl}orders`, body);
}
