import { createSlice } from "@reduxjs/toolkit";

import { modal } from "../utils/constants";

const modalSlice = createSlice({
  name: '@@modal',
  initialState: null,
  reducers: {
    openModal: (state, action) => {
      switch (action.payload.type) {
        case modal.type.order:
          return {
            ...state,
            type: action.payload.type,
            isActive: true,
          }
        case modal.type.ingredientsDetails:
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
        type: modal.type.loadingSpinner,
        isActive: true,
        
      }
    },
    closeModal: (state, action) => {
      if (action.payload.type === modal.type.ingredientsDetails) {
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
