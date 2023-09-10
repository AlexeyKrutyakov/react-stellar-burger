import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: '@@modal',
  initialState: null,
  reducers: {
    showOrder: (state, action) => {
      return {
        ...state,
        type: 'order',
        isActive: true,
        ingredientsIdList: action.payload.ingredientsIdList,
        orderNumber: action.payload.orderNumber
      }
    },
    showSpinner: (state, _) => {
      return {
        ...state,
        type: 'spinner',
        isActive: true,
        
      }
    },
    closeSpinner: (state, _) => {
      return {
        ...state,
        isActive: false,
      }
    }
  }
});

export const {
  showOrder,
  showSpinner,
  closeSpinner
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
