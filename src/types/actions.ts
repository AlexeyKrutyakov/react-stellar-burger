export type WsActions = {
  wsInit: 'WS_CONNECTION_START';
  feedWsInit: 'FEED_WS_CONNECTION_START';
  ordersWsInit: 'ORDERS_WS_CONNECTION_START';
  feedWsStop: 'FEED_WS_CONNECTION_STOP';
  ordersWsStop: 'ORDERS_WS_CONNECTION_STOP';
  onOpen: 'WS_CONNECTION_SUCCESS';
  onError: 'WS_CONNECTION_ERROR';
  onClose: 'WS_CONNECTION_CLOSED';
  onMessage: 'WS_GET_MESSAGE';
};
