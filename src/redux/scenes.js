import { createSlice, current } from '@reduxjs/toolkit';

export const scenesSlice = createSlice({
  //スライスの名前
  name: 'scenes',
  initialState: {
    texts: [],
    images: [],
  },
  reducers: {
    //これがアクション
    addText: (state, action) => {
      const id = state.texts.find((text) => text.id === action.payload.id);
      if (id) {
        state.texts = state.texts.filter((text) => text.id !== action.payload.id);
        state.texts = [action.payload, ...state.texts];
      } else {
        state.texts = [action.payload, ...state.texts];
      }
    },
    addImage: (state, action) => {
      const id = state.images.find((image) => image.id === action.payload.id);
      if (id) {
        state.images = state.images.filter((image) => image.id !== action.payload.id);
        state.images = [action.payload, ...state.images];
      } else {
        state.images = [action.payload, ...state.images];
      }
    },
    deleteAllState: (state) => {
      state.texts = [];
      state.images = [];
    },
  },
});

export const { addImage, addText, deleteAllState } = scenesSlice.actions;

//ここでreducerをエクスポートしてstoreに登録する
export default scenesSlice.reducer;
