import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from '@/store/store'
import { useDispatch, useSelector } from "react-redux";
import { setIdFrontFileInfo, setIdBackFileInfo, setAdditionalFilesInfo } from "@/store/documentUploadSlice";

import FileUpload from "@/components/FileUpload";
import MultiFileUpload from "@/components/MultiFileUpload";
import Alert from '@/components/Alert';

const DocumentUpload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const documentUpload = useSelector((state: RootState) => state.documentUpload);

  // Keep files in local component state for preview and manipulation.
  // Redux stores only serializable metadata (name/size/type) and is updated on Next/Back.


  const [idFrontFile, setIdFrontFile] = useState<File | null>(null);
  const [idBackFile, setIdBackFile] = useState<File | null>(null);
  const [additionalDocuments, setAdditionalDocuments] = useState<File[]>([]);


  const handleFileChange = (file: File | null, setFile: React.Dispatch<React.SetStateAction<File | null>>, type: string) => {
    if (file) {
      const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];
      const allowedTypesText = ".jpg,.png,.pdf";

      if (allowedTypes.includes(file.type)) {
        setFile(file);
      } else {
        setVisalbe(true);
        setMessage(`File type not allowed. Please select ${allowedTypesText} file.`);
        setFile(null);
      }
    } else {
      // clearing local file selection; metadata will be cleared on Back/Next as needed
      setFile(null);
      if (type === 'front') {
        dispatch(setIdFrontFileInfo(null));
      } else if (type === 'back') {
        dispatch(setIdBackFileInfo(null));
      }
    }
  };

  const handleAdditionalFilesChange = (files: File[]) => {
    setAdditionalDocuments(files);
  };

  // Preview handled inside FileUpload / MultiFileUpload components.

  const [visible, setVisible] = useState<boolean>(false)
  const [mode, setMode] = useState<'warning' | 'info' | 'success' | 'danger'>('warning')
  const [message, setMessage] = useState<string>('')
  const handleAlertClose = () => {
    setVisible(false)
    setMessage('')
  };

  const [errors, setErrors] = useState<Errors>({});


  const hasFrontFile = !!idFrontFile || !!documentUpload.idFrontFile;
  const hasBackFile = !!idBackFile || !!documentUpload.idBackFile;
  const frontFileInfo = idFrontFile ? { name: idFrontFile.name, size: idFrontFile.size, type: idFrontFile.type } : documentUpload.idFrontFile;
  const backFileInfo = idBackFile ? { name: idBackFile.name, size: idBackFile.size, type: idBackFile.type } : documentUpload.idBackFile;
  const additionalFilesInfo = additionalDocuments.length > 0 ? additionalDocuments.map(file => ({ name: file.name, size: file.size, type: file.type })) : documentUpload.additionalFiles;

  const handleBack = () => {
    dispatch(setIdFrontFileInfo(frontFileInfo));
    dispatch(setIdBackFileInfo(backFileInfo));
    dispatch(setAdditionalFilesInfo(additionalFilesInfo));

    navigate('/');
  };

  const handleNext = () => {
    const newErrors: Errors = {};
    let hasErrorsFlag = false;

    if (!hasFrontFile) {
      newErrors.idFront = "ID Card Front is required";
      hasErrorsFlag = true;
    }

    if (!hasBackFile) {
      newErrors.idBack = "ID Card Back is required";
      hasErrorsFlag = true;
    }

    setErrors(newErrors);

    if (hasErrorsFlag) {
      setMode('warning');
      setMessage('Please upload the required documents.');
      setVisalbe(true);
      return;
    }

    dispatch(setIdFrontFileInfo(frontFileInfo));
    dispatch(setIdBackFileInfo(backFileInfo));
    dispatch(setAdditionalFilesInfo(additionalFilesInfo));

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
          accept="image/jpeg, image/png	,application/pdf"
          acceptText=".jpg,.png,.pdf"
          maxSizeMB={2}
          onFileChange={(file) => handleFileChange(file, setIdFrontFile, 'front')}
          preview={true}
          required={true}
          errorMessage={errors.idFront}
          fileInfo={documentUpload.idFrontFile}
        />
        <FileUpload
          label="ID Card Back"
          id="id-back"
          name="id-back"
          accept="image/jpeg, image/png	,application/pdf"
          acceptText=".jpg,.png,.pdf"
          maxSizeMB={2}
          onFileChange={(file) => handleFileChange(file, setIdBackFile, 'back')}
          preview={true}
          required={true}
          errorMessage={errors.idBack}
          fileInfo={documentUpload.idBackFile}
        />

        <MultiFileUpload
          label="Additional Documents"
          id="additional-docs"
          name="additional-docs"
          accept="image/jpeg, image/png ,application/pdf"
          acceptText=".jpg,.png,.pdf"
          maxSizeMB={10}
          onFileChange={handleAdditionalFilesChange}
          preview={true}
          required={false}
          filesInfo={documentUpload.additionalFiles}
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