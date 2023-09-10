import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: '@@modal',
  initialState: null,
  reducers: {
    openModal: (state, action) => {
      return {
        ...state,
        type: action.payload,
        isActive: true,
        orderNumber: 456789
      }
    },
    showSpinner: (state, _) => {
      return {
        ...state,
        type: 'spinner',
        isActive: true,
        
      }
    },
    closeModal: (state, _) => {
      return {
        ...state,
        type: '',
        isActive: false,
      }
    },
  }
});

export const {
  openModal,
  closeModal,
  showSpinner,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
