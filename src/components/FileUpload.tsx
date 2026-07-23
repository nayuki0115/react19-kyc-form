import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Button from "@/components/Button";
import { validateUploadFile } from "@/utils/fileValidation";
import type { FileUploadProps } from '@/types/formTypes';

const FileUpload = ({ label, id, name, file, onFileChange, accept, acceptText, maxSizeMB, preview, required, errorMessage }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const clearSelectedFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileChange(null);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setError(null);
      clearSelectedFile();
      return;
    }

    const validationError = validateUploadFile(file, {
      accept,
      acceptText,
      maxSizeMB,
    });

    if (validationError) {
      setError(validationError);
      clearSelectedFile();
      return;
    }

    setError(null);
    onFileChange(file);
  };

  const handleChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isPreviewable = (type: string): boolean => {
    return type.startsWith('image/');
  };

  // manage preview URL lifecycle
  useEffect(() => {
    if (file && isPreviewable(file.type)) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(null);
      };
    }
    return () => {};
  }, [file]);

  const handleDeleteFile = () => {
    setError(null);
    clearSelectedFile();
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}
        {required ? <span className="required">*</span> : ''}
      </label>

      <Button className='choose-file-button' variant="primary" type="button" onClick={handleChooseFileClick}>Select File</Button>

      <input
        type="file"
        id={id}
        name={name}
        accept={accept}
        required={required}
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
      {file && (
        <div className="selected-files">
          <label className="selected-files-label">Selected Files:</label>
          <ul>
            <li className="selected-files-item">
              <span className="selected-file-name">{file.name} ({formatFileSize(file.size)})</span>
              {preview && isPreviewable(file.type) && previewUrl && (
                <div className="file-preview">
                  <img src={previewUrl} alt={file.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </div>
              )}
              <Button type="button" className="delete-button" variant="secondary" onClick={handleDeleteFile}> X </Button>
            </li>
          </ul>
        </div>
      )}
      {error ? <p className="error-message">{error}</p> : ''}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default FileUpload;
