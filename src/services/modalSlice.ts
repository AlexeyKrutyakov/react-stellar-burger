// import from modules
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Modal } from 'types';

const initialState: Modal = {
  type: '',
  background: '/',
  isActive: false,
};

const modalSlice = createSlice({
  name: '@@modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        type: action.payload,
        isActive: true,
      };
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
