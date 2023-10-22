export const wsMiddleware = (wsActions) => {
  return (store) => {
    let ws = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onStop, onError, onClose, onMessage } = wsActions;

      if (type === wsInit) {
        ws = new WebSocket(payload);
        console.log('ws', ws);
      }

      if (ws) {
        if (type === onStop) {
          ws.close(1000, '');
        }
        ws.onopen = (event) => {
          dispatch(onOpen(event.type));
        };
        ws.onerror = (event) => {
          dispatch(onError(event.message));
        };
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          dispatch(onMessage(data));
        };
        ws.onclose = (event) => {
          dispatch(onClose(event.type));
        };
      }
      next(action);
    };
  };
};
