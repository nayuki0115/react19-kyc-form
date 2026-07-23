import { configureStore } from '@reduxjs/toolkit';
import basicInfoReducer from '@/store/basicInfoSlice';


const store = configureStore({
  reducer: {
    basicInfo: basicInfoReducer, // 將 basicInfo reducer 添加到 store
  },
});

export default store;

export interface RootState {
  basicInfo: formDataType;
}

export type AppDispatch = typeof store.dispatch;
