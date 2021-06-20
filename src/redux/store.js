import { configureStore } from '@reduxjs/toolkit';
import scenesReducer from 'src/redux/scenes';

export default configureStore({
  reducer: {
    stepper: scenesReducer,
  },
});
