import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './auth';

const store = configureStore({
  reducer: { auth: authSliceReducer },
});

export default store;
