import { createSlice } from '@reduxjs/toolkit';

export const scenesSlice = createSlice({
  //スライスの名前
  name: 'scenes',
  initialState: {
    scenes: [],
  },
  reducers: {
    //これがアクション
    addScene: (state, action) => {
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
        state.scenes = [action.payload, ...state.scenes];
      }
    },
    deleteAllScene: (state) => {
      state.scenes = [];
    },
  },
});

export const { addScene, deleteAllScene } = scenesSlice.actions;

//ここでreducerをエクスポートしてstoreに登録する
export default scenesSlice.reducer;
