import { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";


const FileUpload = ({ label, id, name, onFileChange, accept, acceptText, maxSizeMB, preview, required, errorMessage, fileInfo }: fileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setError(null);
      validateFile(file);
      onFileChange(file);
    } else {
      setSelectedFile(null);
      onFileChange(null);
    }
  };

  const validateFile = (file: File) => {
    if (accept && !accept.split(',').map(s => s.trim()).includes(file.type)) {
      setError(`File type does not match. Only accepting: ${acceptText}`);
      setSelectedFile(null);
      onFileChange(null);
      return;
    }

    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds limit (${maxSizeMB} MB).`);
      setSelectedFile(null);
      onFileChange(null);
      return;
    }
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
    if (selectedFile && isPreviewable(selectedFile.type)) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(null);
      };
    }
    return () => {};
  }, [selectedFile]);

  const handleDeleteFile = () => {
    setSelectedFile(null);
    onFileChange(null)
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
        style={{ display: 'none' }} // 隱藏預設的 input
        onChange={handleFileSelect} // 監聽預設輸入框的 change 事件
      />
      {selectedFile && (
        <div className="selected-files">
          <label className="selected-files-label">Selected Files:</label>
          <ul>
            <li className="selected-files-item">
              <span className="selected-file-name">{selectedFile.name} ({formatFileSize(selectedFile.size)})</span>
              {preview && selectedFile && isPreviewable(selectedFile.type) && previewUrl && (
                <div className="file-preview">
                  <img src={previewUrl} alt={selectedFile.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </div>
              )}
              <Button type="button" className="delete-button" variant="secondary" onClick={handleDeleteFile}> X </Button>
            </li>
          </ul>
        </div>
      )}
      {fileInfo && !selectedFile && (
        <div className="selected-files">
          <label className="selected-files-label">Selected Files:</label>
          <ul>
            <li className="selected-files-item">
              <span className="selected-file-name">{fileInfo.name} ({formatFileSize(fileInfo.size)})</span>
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