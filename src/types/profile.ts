import { Order } from './order';

export type User = {
  email: string;
  name: string;
  password?: string;
};

export type Profile = {
  isAuthChecked: boolean;
  user: User | null;
  status: string;
  success: boolean;
  requestHasError: boolean;
  wsConnectionStatus: string;
  orders: Order[] | null;
  errorMessage?: string;
};

export type WebSocketUserOrders = {
  success: boolean;
  orders: Order[];
  total: number | null;
  totalToday: number | null;
  socketConnectionStatus: string | null;
};
