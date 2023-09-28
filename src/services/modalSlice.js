import { createSlice } from "@reduxjs/toolkit";

import { MODAL } from "../utils/constants";

const initialState = {
  type: '',
  isActive: false,
    currentIngredient: {
      "_id": "643d69a5c3f7b9001cfa0941",
      "name": "Биокотлета из марсианской Магнолии",
      "type": "main",
      "proteins": 420,
      "fat": 142,
      "carbohydrates": 242,
      "calories": 4242,
      "price": 424,
      "image": "https://code.s3.yandex.net/react/code/meat-01.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
      "__v": 0
  },
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
    closeModal: () => {
      return initialState;
    },
  }
});

export const {
  openModal,
  closeModal,
  showSpinner,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
