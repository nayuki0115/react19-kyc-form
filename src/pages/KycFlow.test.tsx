import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import BasicInfo from '@/pages/BasicInfo';
import Confirmation from '@/pages/Confirmation';
import DocumentUpload from '@/pages/DocumentUpload';
import Index from '@/pages/Index';
import {
  createTestStore,
  renderWithStore,
} from '@/test/testUtils';

const completedBasicInfo = {
  name: 'Annie Chen',
  email: 'annie@example.com',
  phone: '0912345678',
  nationality: 'TW',
  gender: '',
  address: 'Taipei',
  dob: '1990-01-01',
};

const renderKycFlow = () => {
  const store = createTestStore(completedBasicInfo);

  return renderWithStore(
    <MemoryRouter initialEntries={['/document-upload']}>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<BasicInfo />} />
          <Route path="document-upload" element={<DocumentUpload />} />
          <Route path="confirmation" element={<Confirmation />} />
        </Route>
      </Routes>
    </MemoryRouter>,
    { store },
  );
};

const uploadDocuments = () => {
  const frontFile = new File(['front'], 'id-front.jpg', {
    type: 'image/jpeg',
  });
  const backFile = new File(['back'], 'id-back.jpg', {
    type: 'image/jpeg',
  });
  const additionalFile = new File(['proof'], 'address-proof.pdf', {
    type: 'application/pdf',
  });

  fireEvent.change(screen.getByLabelText(/ID Card Front/), {
    target: { files: [frontFile] },
  });
  fireEvent.change(screen.getByLabelText(/ID Card Back/), {
    target: { files: [backFile] },
  });
  fireEvent.change(screen.getByLabelText(/Additional Documents/), {
    target: { files: [additionalFile] },
  });

  return {
    frontFile,
    backFile,
    additionalFile,
  };
};

describe('KYC navigation and file state', () => {
  it('preserves the actual files through Next and Back navigation', async () => {
    const user = userEvent.setup();
    renderKycFlow();
    uploadDocuments();

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(
      await screen.findByRole('heading', { name: 'Confirmation Page' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/id-front\.jpg/)).toBeInTheDocument();
    expect(screen.getByText(/id-back\.jpg/)).toBeInTheDocument();
    expect(screen.getByText(/address-proof\.pdf/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(
      await screen.findByRole('heading', { name: 'Document Upload' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/id-front\.jpg/)).toBeInTheDocument();
    expect(screen.getByText(/id-back\.jpg/)).toBeInTheDocument();
    expect(screen.getByText(/address-proof\.pdf/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(
      await screen.findByRole('heading', { name: 'Confirmation Page' }),
    ).toBeInTheDocument();
  });

  it('submits the original File objects and resets form state', async () => {
    const user = userEvent.setup();
    const { store } = renderKycFlow();
    const {
      frontFile,
      backFile,
      additionalFile,
    } = uploadDocuments();
    const appendSpy = vi.spyOn(FormData.prototype, 'append');

    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(
      await screen.findByRole('button', { name: 'Submit' }),
    );

    expect(appendSpy).toHaveBeenCalledWith('idFrontFile', frontFile);
    expect(appendSpy).toHaveBeenCalledWith('idBackFile', backFile);
    expect(appendSpy).toHaveBeenCalledWith(
      'additionalFiles',
      additionalFile,
    );
    expect(
      screen.getByText('Data has been submitted successfully.'),
    ).toBeInTheDocument();
    expect(store.getState().basicInfo).toEqual({
      name: '',
      email: '',
      phone: '',
      nationality: '',
      gender: '',
      address: '',
      dob: '',
    });
    expect(screen.getAllByText('No file uploaded')).toHaveLength(2);

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(
      await screen.findByRole('heading', { name: 'Document Upload' }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/id-front\.jpg/)).not.toBeInTheDocument();
    expect(screen.queryByText(/id-back\.jpg/)).not.toBeInTheDocument();
    expect(screen.queryByText(/address-proof\.pdf/)).not.toBeInTheDocument();
  });
});
