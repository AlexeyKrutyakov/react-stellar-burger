import { RootState } from './state';
import { store } from '../services/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type useFormProps = {
  password?: string;
  email?: string;
  name?: string;
  token?: string;
};
