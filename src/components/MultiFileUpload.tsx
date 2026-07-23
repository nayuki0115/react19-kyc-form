import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Button from "@/components/Button";
import { validateUploadFile } from "@/utils/fileValidation";

const MultiFileUpload = ({ label, id, name, onFileChange, accept, acceptText, maxSizeMB, preview, required, errorMessage, filesInfo }: mulitFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (filesInfo) {
      setSelectedFiles(filesInfo.map(info => new File([], info.name, { type: info.type })));
    } else {
      setSelectedFiles([]);
    }
  }, [filesInfo]);

  // manage object URLs for previews for selected local files (not metadata-only files)
  useEffect(() => {
    // revoke previous urls
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    const urls = selectedFiles.map(file => (file && file.type.startsWith('image/') ? URL.createObjectURL(file) : ''));
    setPreviewUrls(urls);
    return () => {
      urls.forEach(url => { if (url) URL.revokeObjectURL(url); });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiles]);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    const validFiles: File[] = [];
    const validationErrors: string[] = [];

    files.forEach((file) => {
      const validationError = validateUploadFile(file, {
        accept,
        acceptText,
        maxSizeMB,
      });

      if (validationError) {
        validationErrors.push(validationError);
      } else {
        validFiles.push(file);
      }
    });

    setError(validationErrors.length > 0 ? validationErrors.join(' ') : null);

    if (validFiles.length > 0) {
      const nextFiles = [...selectedFiles, ...validFiles];
      setSelectedFiles(nextFiles);
      onFileChange(nextFiles);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const nextFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(nextFiles);
    onFileChange(nextFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isPreviewable = (type: string): boolean => {
    return type.startsWith('image/');
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}
        {required ? <span className="required">*</span> : ''}
      </label>
      <Button
        className='choose-file-button'
        variant="primary"
        type="button"
        onClick={handleChooseFileClick}
      >
        Select Files
      </Button>
      <input
        type="file"
        id={id}
        name={name}
        accept={accept}
        required={required}
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
        multiple
      />

      


      {selectedFiles.length > 0 && (
        <div className="selected-files">
          <label className="selected-files-label">Selected Files:</label>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index} className="selected-files-item">
                <span className="selected-file-name">
                  {file.name} ({formatFileSize(file.size)})
                </span>
                {preview && isPreviewable(file.type) && previewUrls[index] && (
                  <div className="file-preview">
                    <img src={previewUrls[index]} alt={file.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  </div>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => handleRemoveFile(index)}
                  className="remove-file-button"
                >
                  X
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}


      {error ? <p className="error-message">{error}</p> : ''}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default MultiFileUpload;
