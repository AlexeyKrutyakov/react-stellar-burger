import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: '',
  background: '/',
  isActive: false,
  isSpinnerActive: false,
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
      }
    },
    showSpinner: state => {
      state.isSpinnerActive = true;
    },
    closeSpinner: state => {
      state.isSpinnerActive = false;
    },
    closeModal: () => {
      return initialState;
    },
  }
});

export const {
  openModal,
  closeModal,
  showSpinner,
  closeSpinner,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
