import { createSlice } from "@reduxjs/toolkit";

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
      //オブジェクトにidをつけて配列に変換
      const array = Object.entries(action.payload).map(([key, value], index) => ({ id: index + 1, [key]: value }));
      state.texts = array;
    },
    addImages: (state, action) => {
      //idが存在するかどうかをまずは判定
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
      //idの順番に並び替える
      const sorted = state.images.sort((a, b) => {
        return a.id - b.id;
      });
      state.images = sorted;
    },

    addPreviewImage: (state, action) => {
      //idが存在するかどうかをまずは判定
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
      //idの順番に並び替える
      const sorted = state.scenes.sort((a, b) => {
        return a.id - b.id;
      });
      state.scenes = sorted;
    },
    addPreviewTexts: (state, action) => {
      //オブジェクトにidをつけて配列に変換
      const texts = Object.entries(action.payload).map(([key, value], index) => ({ id: index + 1, [key]: value }));

      //配列の合成 idが一緒なものはまとめる
      //https://stackoverflow.com/questions/19480008/javascript-merging-objects-by-id
      const data = state.scenes.map((scene) => ({ ...scene, ...texts.find((text) => text.id === scene.id) }));
      state.scenes = data;
    },

    deleteAllScenes: (state) => {
      state.images = [];
      state.texts = [];
      state.scenes = [];
    },
  },
});

export const { addImages, addTexts, addPreviewImage, addPreviewTexts, deleteAllScenes } = scenesSlice.actions;

//ここでreducerをエクスポートしてstoreに登録する
export default scenesSlice.reducer;
