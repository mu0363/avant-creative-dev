import { createSlice, current } from "@reduxjs/toolkit";

export const scenesSlice = createSlice({
  //スライスの名前
  name: "scenes",
  initialState: {
    images: [],
    texts: [],
    scenes: [],
  },
  reducers: {
    addTexts: (state, action) => {
      //idが惣菜するかどうかをまずは判定
      const id = state.texts.find((text) => text.id === action.payload.id);
      //あればabject同士を結合して追加処理
      if (id) {
        state.texts.map((text) => {
          if (text.id === action.payload.id) {
            Object.assign(text, action.payload);
          }
        });
        //なければそのまま追加
      } else {
        state.texts = [action.payload, ...state.texts];
      }
    },
    addImages: (state, action) => {
      //idが惣菜するかどうかをまずは判定
      const id = state.images.find((image) => image.id === action.payload.id);
      //あればabject同士を結合して追加処理
      if (id) {
        state.images.map((image) => {
          if (image.id === action.payload.id) {
            Object.assign(image, action.payload);
          }
        });
        //なければそのまま追加
      } else {
        state.images = [...state.images, action.payload];
      }
    },

    // ----- テキストとイメージを一緒にする場合はこちら
    addPreview: (state, action) => {
      //idが惣菜するかどうかをまずは判定
      const id = state.scenes.find((scene) => scene.id === action.payload.id);
      //あればabject同士を結合して追加処理
      if (id) {
        state.scenes.map((scene) => {
          if (scene.id === action.payload.id) {
            Object.assign(scene, action.payload);
          }
        });

        //なければそのまま追加
      } else {
        state.scenes = [...state.scenes, action.payload];
      }
    },

    deleteAllScenes: (state) => {
      state.images = [];
      state.texts = [];
      state.scenes = [];
    },
  },
});

export const { addImages, addTexts, addPreview, deleteAllScenes } = scenesSlice.actions;

//ここでreducerをエクスポートしてstoreに登録する
export default scenesSlice.reducer;
