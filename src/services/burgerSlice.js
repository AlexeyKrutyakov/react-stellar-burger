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
        const dragItemIndex = action.payload.dragItemIndex;
        const dropItemIndex = action.payload.dropItemIndex;
        
        console.log('dragItemIndex', dragItemIndex);
        console.log('dropItemIndex', dropItemIndex);
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
