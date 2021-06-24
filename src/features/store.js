import { configureStore } from "@reduxjs/toolkit";
import scenesReducer from "src/features/scenes/scenesSlice";
import loadingReducer from "src/features/loading/loadingSlice";

export default configureStore({
  reducer: {
    scenes: scenesReducer,
    loading: loadingReducer,
  },
});
