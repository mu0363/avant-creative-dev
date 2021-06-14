import { configureStore } from '@reduxjs/toolkit';
import stepperReducer from 'src/redux/stepper';

export default configureStore({
  reducer: {
    stepper: stepperReducer,
  },
});
