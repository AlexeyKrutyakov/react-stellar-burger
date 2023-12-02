import { store } from '../services/store';

export type AppDispatch = typeof store.dispatch;

export type useFormProps = {
  password?: string;
  email?: string;
  name?: string;
  token?: string;
};
