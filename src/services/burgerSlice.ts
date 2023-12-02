// import from modules
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
// import types
import { Burger, Ingredient } from 'types';

const initialState: Burger = {
  bun: null,
  mains: [],
};

const burgerSlice = createSlice({
  name: '@@burger',
  initialState,
  reducers: {
    addBun: {
      reducer: (state, action: PayloadAction<Ingredient>) => {
        return {
          ...state,
          bun: action.payload,
        };
      },
      prepare: bun => {
        const constructorId = nanoid();
        return { payload: { ...bun, constructorId } };
      },
    },
    addMain: {
      reducer: (state, action: PayloadAction<Ingredient>) => {
        return {
          ...state,
          mains: [...state.mains, action.payload],
        };
      },
      prepare: main => {
        const constructorId = nanoid();
        return { payload: { ...main, constructorId } };
      },
    },
    deleteMain: (state, action: PayloadAction<{ index: number }>) => {
      const newMains = [...state.mains];
      newMains.splice(action.payload.index, 1);

      return {
        ...state,
        mains: newMains,
      };
    },
    sortMains: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>,
    ) => {
      const dragIndex = action.payload.dragIndex;
      const hoverIndex = action.payload.hoverIndex;
      const newMains = [...state.mains];
      newMains.splice(hoverIndex, 0, newMains.splice(dragIndex, 1)[0]);

      return {
        ...state,
        mains: newMains,
      };
    },
    resetConstructorData: () => {
      return initialState;
    },
  },
});

export const { addBun, addMain, deleteMain, sortMains, resetConstructorData } =
  burgerSlice.actions;

export const burgerReducer = burgerSlice.reducer;
