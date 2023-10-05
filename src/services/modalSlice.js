import { createSlice } from "@reduxjs/toolkit";

import { MODAL } from "../utils/constants";

const initialState = {
  type: '',
  background: '/',
  isActive: false,
  isSpinnerActive: false,
  currentIngredient: null,
};

const modalSlice = createSlice({
  name: '@@modal',
  initialState: initialState,
  reducers: {
    openModal: (state, action) => {
      switch (action.payload.type) {
        case MODAL.type.order:
          return {
            ...state,
            type: action.payload.type,
            isActive: true,
          }
        case MODAL.type.ingredientsDetails:
          return {
            ...state,
            type: action.payload.type,
            isActive: true,
            currentIngredient: action.payload.item,
          }
        default:
          break;
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
