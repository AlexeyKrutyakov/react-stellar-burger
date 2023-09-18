import { createSlice } from "@reduxjs/toolkit";

import { MODAL } from "../utils/constants";

const initialState = {
  type: '',
  isActive: false,
  currentIngredient: {},
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
    showSpinner: (state, _) => {
      return {
        ...state,
        type: MODAL.type.loadingSpinner,
        isActive: true,
        
      }
    },
    closeModal: (state, action) => {
      if (action.payload.type === MODAL.type.ingredientsDetails) {
        return {
          ...state,
          type: '',
          isActive: false,
          currentIngredient: {}
        }
      }
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
