import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FileUpload from '@/components/FileUpload';

const renderFileUpload = (
  onFileChange = vi.fn(),
  maxSizeMB = 1,
) => {
  render(
    <FileUpload
      label="ID Card Front"
      id="id-front"
      name="id-front"
      file={null}
      onFileChange={onFileChange}
      accept="image/jpeg,image/png,application/pdf"
      acceptText=".jpg, .png, .pdf"
      maxSizeMB={maxSizeMB}
    />,
  );

  return {
    fileInput: screen.getByLabelText('ID Card Front') as HTMLInputElement,
    onFileChange,
  };
};

describe('FileUpload validation', () => {
  it('accepts a supported file within the size limit', () => {
    const { fileInput, onFileChange } = renderFileUpload();
    const file = new File(['valid image'], 'id-card.jpg', {
      type: 'image/jpeg',
    });

    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    expect(onFileChange).toHaveBeenCalledWith(file);
    expect(screen.queryByText(/type is not supported/)).not.toBeInTheDocument();
  });

  it('rejects an unsupported MIME type without passing it to the parent', () => {
    const { fileInput, onFileChange } = renderFileUpload();
    const file = new File(['plain text'], 'id-card.txt', {
      type: 'text/plain',
    });

    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    expect(onFileChange).toHaveBeenCalledWith(null);
    expect(onFileChange).not.toHaveBeenCalledWith(file);
    expect(screen.getByText(/type is not supported/)).toBeInTheDocument();
  });

  it('rejects a file over the configured size limit', () => {
    const { fileInput, onFileChange } = renderFileUpload();
    const file = new File(
      [new Uint8Array(1024 * 1024 + 1)],
      'large-id-card.jpg',
      { type: 'image/jpeg' },
    );

    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    expect(onFileChange).toHaveBeenCalledWith(null);
    expect(onFileChange).not.toHaveBeenCalledWith(file);
    expect(screen.getByText(/exceeds the 1 MB size limit/)).toBeInTheDocument();
  });
});
