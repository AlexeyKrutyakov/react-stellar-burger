import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  mains: [],
};

const burgerSlice = createSlice({
  name: '@@burger',
  initialState: initialState,
  reducers: {
    addBun: {
      reducer: (state, action) => {
        return {
          ...state,
          bun: action.payload
        }
      }
    },
    addMain: {
      reducer: (state, action) => {
        return {
          ...state,
          mains: [...state.mains, action.payload],
        }
      },
      prepare: (main) => {
        const constructorId = nanoid();
        return { payload: { ...main, constructorId }}
      },
    },
    deleteMain: {
      reducer: (state, action) => {
        const newMains = [...state.mains];
        newMains.splice(action.payload.index, 1);
        
        return {
          ...state,
          mains: newMains,
        }
      },
    },
    sortMains: {
      reducer: (state, action) => {
        const dragIndex = action.payload.dragIndex;
        const hoverIndex = action.payload.hoverIndex;
        const newMains = [...state.mains];
        newMains.splice(hoverIndex, 0, newMains.splice(dragIndex, 1)[0]);

        return {
          ...state,
          mains: newMains,
        }
      },
    },
    resetConstructorData: {
      reducer: () => {
        return initialState
      }
    }
  }
});

export const {
  addBun,
  addMain,
  deleteMain,
  sortMains,
  resetConstructorData,
} = burgerSlice.actions;

export const burgerReducer = burgerSlice.reducer;