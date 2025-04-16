import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定義 state 的初始值
const initialState: formDataType = {
  name: '',
  email: '',
  phone: '',
  nationality: '',
  gender: '',
  address: '',
  dob: '',
};

// 使用 createSlice 創建一個 slice
const basicInfoSlice = createSlice({
  name: 'basicInfo', // 這個 slice 的名稱，會作為 action types 的前綴
  initialState,
  reducers: {
    // 定義你的 reducers，它們會處理特定的 actions 並更新 state
    setBasicInfoData: (state, action: PayloadAction<formDataType>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.nationality = action.payload.nationality;
      state.gender = action.payload.gender;
      state.address = action.payload.address;
      state.dob = action.payload.dob;
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    }
  },
});

// 導出這個 slice 產生的 actions
export const { setBasicInfoData, updateName, updateEmail } = basicInfoSlice.actions;

// 導出這個 slice 的 reducer 函數，它將會被添加到 store 中
export default basicInfoSlice.reducer;