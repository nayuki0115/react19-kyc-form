import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import BasicInfo from '@/pages/BasicInfo';
import {
  renderWithStore,
} from '@/test/testUtils';

const renderBasicInfo = () => renderWithStore(
  <MemoryRouter initialEntries={['/']}>
    <Routes>
      <Route path="/" element={<BasicInfo />} />
      <Route
        path="/document-upload"
        element={<h2>Document Upload Test Page</h2>}
      />
    </Routes>
  </MemoryRouter>,
);

const fillRequiredFields = async (
  email: string,
  dob = '1990-01-01',
) => {
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/Name/), 'Annie Chen');
  await user.type(screen.getByLabelText(/Email/), email);
  await user.type(screen.getByLabelText(/Phone/), '0912345678');
  await user.selectOptions(
    screen.getByRole('combobox', { name: /Nationality/ }),
    'TW',
  );
  fireEvent.change(screen.getByLabelText(/Date of Birth/), {
    target: { value: dob },
  });

  return user;
};

describe('Basic Information validation', () => {
  it('shows every required-field error and does not navigate', async () => {
    const user = userEvent.setup();
    renderBasicInfo();

    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Phone is required.')).toBeInTheDocument();
    expect(screen.getByText('Nationality is required.')).toBeInTheDocument();
    expect(screen.getByText('Date of Birth is required.')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Basic Information' }),
    ).toBeInTheDocument();
  });

  it('blocks an invalid email, then saves valid data and navigates', async () => {
    const { store } = renderBasicInfo();
    const user = await fillRequiredFields('invalid-email');

    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByText('Invalid email format.')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Basic Information' }),
    ).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/Email/);
    await user.clear(emailInput);
    await user.type(emailInput, 'annie@example.com');
    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(
      await screen.findByRole('heading', { name: 'Document Upload Test Page' }),
    ).toBeInTheDocument();
    expect(store.getState().basicInfo).toMatchObject({
      name: 'Annie Chen',
      email: 'annie@example.com',
      phone: '0912345678',
      nationality: 'TW',
      dob: '1990-01-01',
    });
  });

  it('blocks a date of birth outside the allowed age range', async () => {
    const today = new Date();
    const underageDob = `${today.getFullYear() - 17}-01-01`;
    renderBasicInfo();
    const user = await fillRequiredFields(
      'annie@example.com',
      underageDob,
    );

    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(
      screen.getByText('Must be between 18 and 85 years old'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Basic Information' }),
    ).toBeInTheDocument();
  });
});
