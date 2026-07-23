import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BasicInfoFormData } from '@/types/formTypes';

const initialState: BasicInfoFormData = {
  name: '',
  email: '',
  phone: '',
  nationality: '',
  gender: '',
  address: '',
  dob: '',
};

const basicInfoSlice = createSlice({
  name: 'basicInfo',
  initialState,
  reducers: {
    setBasicInfoData: (state, action: PayloadAction<BasicInfoFormData>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.nationality = action.payload.nationality;
      state.gender = action.payload.gender;
      state.address = action.payload.address;
      state.dob = action.payload.dob;
    },
  },
});

export const { setBasicInfoData } = basicInfoSlice.actions;

export default basicInfoSlice.reducer;
