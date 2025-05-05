import { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";

const MultiFileUpload = ({ label, id, name, onFileChange, accept, acceptText, maxSizeMB, preview, required, errorMessage, filesInfo }: mulitFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (filesInfo) {
      setSelectedFiles(filesInfo.map(info => new File([], info.name, { type: info.type })));
    } else {
      setSelectedFiles([]);
    }
  }, [filesInfo]);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const validationError = validateFile(file);
        if (!validationError) {
          validFiles.push(file);
        } else {
          setError(validationError); // 顯示最後一個錯誤
        }
      }
      setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
      onFileChange([...selectedFiles, ...validFiles]); // 通知父組件
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setError(null);
    }
  };
  const validateFile = (file: File): string | null => {
    if (accept && !accept.split(',').map((s) => s.trim()).includes(file.type)) {
      return `File type "${file.name}" does not match. Only accepting: ${acceptText}`;
    }

    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      return `File "${file.name}" size exceeds limit (${maxSizeMB} MB).`;
    }
    return null;
  };

  const handleChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
    onFileChange(selectedFiles.filter((item, index) => index !== indexToRemove)); // 通知父組件
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
                {preview && isPreviewable(file.type) && (
                  <div className="file-preview">
                    <img src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
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