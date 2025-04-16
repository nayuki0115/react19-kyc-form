import { configureStore } from '@reduxjs/toolkit';
import basicInfoReducer from '@/store/basicInfoSlice';
import documentUploadReducer  from '@/store/documentUploadSlice.ts'


const store = configureStore({
  reducer: {
    basicInfo: basicInfoReducer, // 將 basicInfo reducer 添加到 store
    documentUpload: documentUploadReducer
  },
});

export default store;

export interface RootState {
  basicInfo: formDataType;
  documentUpload: DocumentUploadState;
}

export type AppDispatch = typeof store.dispatch;