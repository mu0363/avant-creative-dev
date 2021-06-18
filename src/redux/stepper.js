import { createSlice } from '@reduxjs/toolkit';

export const stepperSlice = createSlice({
  //スライスの名前
  name: 'stepper',
  initialState: {
    images: {},
    texts: {},
  },
  reducers: {
    //これがアクション
    addImage: (state, action) => {
      const payload = action.payload;
      //このスライス全体の""state"のinitialStateの""images"ってこと
      state.images = { ...state.images, ...payload };
    },
    addText: (state, action) => {
      const payload = action.payload;
      state.texts = { ...state.texts, ...payload };
    },
    deleteAllState: (state) => {
      state.images = {};
      state.texts = {};
    },
  },
});

export const { addImage, addText, deleteAllState } = stepperSlice.actions;

//ここでreducerをエクスポートしてstoreに登録する
export default stepperSlice.reducer;
