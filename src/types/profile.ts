import { Order } from './order';

type User = {
  email: string;
  name: string;
};

export type Profile = {
  isAuthChecked: boolean;
  user: User | null;
  status: string;
  success: boolean;
  requestHasError: boolean;
  errorMessage: '';
  wsConnectionStatus: string;
  orders: Order[] | null;
};
