import { Middleware } from 'redux';
// import types
import { RootState, WsConfig } from 'types';
import { requestNewTokens } from 'utils/api';
import { API_URLS, TOKENS, WS_ACTIONS } from 'utils/constants';

export const socketMiddleware = (
  wsActions: WsConfig,
): Middleware<{}, RootState> => {
  return store => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onStop, onError, onClose, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        if (type === onStop) {
          socket.close(1000);
        }
        socket.onopen = event => {
          dispatch(onOpen(event.type));
        };
        socket.onerror = event => {
          dispatch(onError('Error'));
        };
        socket.onmessage = event => {
          const data = JSON.parse(event.data);
          if (data.message === 'Invalid or missing token') {
            requestNewTokens()
              .then(res => {
                localStorage.setItem(TOKENS.names.refresh, res.refreshToken);
                localStorage.setItem(TOKENS.names.access, res.accessToken);
              })
              .then(() => {
                const token = localStorage.getItem(TOKENS.names.access);
                dispatch({
                  type: WS_ACTIONS.ordersWsInit,
                  payload: `${API_URLS.wss.personalOrders}?token=${
                    token ? token.split('Bearer ')[1] : ''
                  }`,
                });
              });
          }
          dispatch(onMessage(data));
        };
        socket.onclose = event => {
          dispatch(onClose(event.type));
        };
      }
      next(action);
    };
  };
};
