import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Order } from './order';

export type WsConfig = {
  wsInit: string;
  onOpen: ActionCreatorWithPayload<string>;
  onStop: string;
  onError: ActionCreatorWithPayload<string>;
  onClose: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<WebSocketPayload>;
};

export type WebSocketPayload = {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
};
