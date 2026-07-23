import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FileUpload from "@/components/FileUpload";
import MultiFileUpload from "@/components/MultiFileUpload";
import Alert from '@/components/Alert';
import useDocumentFiles from "@/hooks/useDocumentFiles";
import type { DocumentUploadErrors } from '@/types/formTypes';

const documentMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
const documentAccept = documentMimeTypes.join(',');
const documentAcceptText = '.jpg, .png, .pdf';
const idDocumentMaxSizeMB = 2;
const additionalDocumentMaxSizeMB = 10;

const DocumentUpload = () => {
  const navigate = useNavigate();
  const {
    idFrontFile,
    setIdFrontFile,
    idBackFile,
    setIdBackFile,
    additionalFiles,
    setAdditionalFiles,
  } = useDocumentFiles();

  const [visible, setVisible] = useState<boolean>(false)
  const [mode, setMode] = useState<'warning' | 'info' | 'success' | 'danger'>('warning')
  const [message, setMessage] = useState<string>('')
  const handleAlertClose = () => {
    setVisible(false)
    setMessage('')
  };

  const [errors, setErrors] = useState<DocumentUploadErrors>({});

  const handleBack = () => {
    navigate('/');
  };

  const handleIdFrontFileChange = (file: File | null) => {
    setIdFrontFile(file);
    if (file) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        idFront: undefined,
      }));
    }
  };

  const handleIdBackFileChange = (file: File | null) => {
    setIdBackFile(file);
    if (file) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        idBack: undefined,
      }));
    }
  };

  const handleNext = () => {
    const newErrors: DocumentUploadErrors = {};
    let hasErrorsFlag = false;

    if (!idFrontFile) {
      newErrors.idFront = "ID Card Front is required";
      hasErrorsFlag = true;
    }

    if (!idBackFile) {
      newErrors.idBack = "ID Card Back is required";
      hasErrorsFlag = true;
    }

    setErrors(newErrors);

    if (hasErrorsFlag) {
      setMode('warning');
      setMessage('Please upload the required documents.');
      setVisible(true);
      return;
    }

    navigate('/confirmation');
  };


  return (
    <section id="step2" className="form-step">
      <Alert visible={visible} mode={mode} message={message} onClose={handleAlertClose} />
      <h2>Document Upload</h2>
      <fieldset>
        <FileUpload
          label="ID Card Front"
          id="id-front"
          name="id-front"
          accept={documentAccept}
          acceptText={documentAcceptText}
          maxSizeMB={idDocumentMaxSizeMB}
          file={idFrontFile}
          onFileChange={handleIdFrontFileChange}
          preview={true}
          required={true}
          errorMessage={errors.idFront}
        />
        <FileUpload
          label="ID Card Back"
          id="id-back"
          name="id-back"
          accept={documentAccept}
          acceptText={documentAcceptText}
          maxSizeMB={idDocumentMaxSizeMB}
          file={idBackFile}
          onFileChange={handleIdBackFileChange}
          preview={true}
          required={true}
          errorMessage={errors.idBack}
        />

        <MultiFileUpload
          label="Additional Documents"
          id="additional-docs"
          name="additional-docs"
          accept={documentAccept}
          acceptText={documentAcceptText}
          maxSizeMB={additionalDocumentMaxSizeMB}
          files={additionalFiles}
          onFileChange={setAdditionalFiles}
          preview={true}
          required={false}
        />

      </fieldset>
      <div className="form-actions">
        <button type="button" className="back-btn" onClick={handleBack}>Back</button>
        <button type="button" className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </section>
  );
}

export default DocumentUpload;
