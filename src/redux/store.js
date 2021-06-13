import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'src/redux/counter';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
