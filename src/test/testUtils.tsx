import { configureStore } from '@reduxjs/toolkit';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { PropsWithChildren, ReactElement } from 'react';
import basicInfoReducer from '@/store/basicInfoSlice';
import type { BasicInfoFormData } from '@/types/formTypes';

export const emptyBasicInfo: BasicInfoFormData = {
  name: '',
  email: '',
  phone: '',
  nationality: '',
  gender: '',
  address: '',
  dob: '',
};

export const createTestStore = (
  basicInfo: BasicInfoFormData = emptyBasicInfo,
) => configureStore({
  reducer: {
    basicInfo: basicInfoReducer,
  },
  preloadedState: {
    basicInfo,
  },
});

type TestStore = ReturnType<typeof createTestStore>;

interface RenderWithStoreOptions extends Omit<RenderOptions, 'wrapper'> {
  store?: TestStore;
}

export const renderWithStore = (
  ui: ReactElement,
  {
    store = createTestStore(),
    ...renderOptions
  }: RenderWithStoreOptions = {},
) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    ...render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
};
