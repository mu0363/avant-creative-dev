import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  //スライスの名前
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

//ここでreducerをエクスポートしてstoreに登録する
export default loadingSlice.reducer;
