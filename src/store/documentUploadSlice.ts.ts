import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: DocumentUploadState = {
  idFrontFile: null,
  idBackFile: null,
  additionalFiles: [],
};

const documentUploadSlice = createSlice({
  name: 'documentUpload',
  initialState,
  reducers: {
    setIdFrontFileInfo: (state, action: PayloadAction<uploadFileInfo | null>) => {
      state.idFrontFile = action.payload;
    },
    setIdBackFileInfo: (state, action: PayloadAction<uploadFileInfo | null>) => {
      state.idBackFile = action.payload;
    },
    setAdditionalFilesInfo: (state, action: PayloadAction<uploadFileInfo[]>) => {
      state.additionalFiles = action.payload;
    },
    clearDocumentInfo: (state) => {
      state.idFrontFile = null;
      state.idBackFile = null;
      state.additionalFiles = [];
    },
  },
});
export const {
  setIdFrontFileInfo,
  setIdBackFileInfo,
  setAdditionalFilesInfo,
  clearDocumentInfo,
} = documentUploadSlice.actions;

export default documentUploadSlice.reducer;