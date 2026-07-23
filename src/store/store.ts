import { configureStore } from '@reduxjs/toolkit';
import basicInfoReducer from '@/store/basicInfoSlice';


const store = configureStore({
  reducer: {
    basicInfo: basicInfoReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
