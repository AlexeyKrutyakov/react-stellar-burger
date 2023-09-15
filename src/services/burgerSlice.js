import { createSlice, nanoid } from "@reduxjs/toolkit";

const burgerSlice = createSlice({
  name: '@@burger',
  initialState: null,
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
      }
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
    }
  }
});

export const {
  addBun,
  addMain,
  sortMains,
} = burgerSlice.actions;

export const burgerReducer = burgerSlice.reducer;
