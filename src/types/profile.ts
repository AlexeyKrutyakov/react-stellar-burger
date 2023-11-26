type User = {
  email: string;
  name: string;
};

export type Profile = {
  isAuthChecked: boolean;
  user: User;
  status: string;
  success: boolean;
  requestHasError: boolean;
  errorMessage: '';
  wsConnectionStatus: string;
  orders: null;
};
