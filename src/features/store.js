import { configureStore } from "@reduxjs/toolkit";
import scenesReducer from "src/features/scenes/scenesSlice";

export default configureStore({
  reducer: {
    scenes: scenesReducer,
  },
});
