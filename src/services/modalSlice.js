import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: '@@modal',
  initialState: null,
  reducers: {
    openModal: (state, action) => {
      switch (action.payload.type) {
        case 'order':
          return {
            ...state,
            type: action.payload.type,
            isActive: true,
          }
        case 'ingredient__details':
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
        type: 'spinner',
        isActive: true,
        
      }
    },
    closeModal: (state, action) => {
      if (action.payload.type === 'ingredient__details') {
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
