// import from modules
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  background: '/',
  isActive: false,
};

const modalSlice = createSlice({
  name: '@@modal',
  initialState: initialState,
  reducers: {
    openModal: (state, action) => {
      return {
        ...state,
        type: action.payload.type,
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
