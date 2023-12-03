import { Middleware } from 'redux';
import { RootState, WsActions, WsConfig } from 'types';

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
