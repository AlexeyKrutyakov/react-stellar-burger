import { Order } from './order';

export type Feed = {
  wsConnectionStatus: string;
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
  errorMessage?: string;
};
