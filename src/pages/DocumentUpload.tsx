import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from '@/store/store'
import { useDispatch, useSelector } from "react-redux";
import { setIdFrontFileInfo, setIdBackFileInfo, setAdditionalFilesInfo } from "@/store/documentUploadSlice.ts";

import FileUpload from "@/components/FileUpload";
import MultiFileUpload from "@/components/MultiFileUpload";
import Alert from '@/components/Alert';

const DocumentUpload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const documentUpload = useSelector((state: RootState) => state.documentUpload);

  useEffect(() => {
    if (documentUpload.idFrontFile) {
      setIdFrontFile(new File([], documentUpload.idFrontFile.name, { type: documentUpload.idFrontFile.type }));
    } else {
      setIdFrontFile(null);
    }

    if (documentUpload.idBackFile) {
      setIdBackFile(new File([], documentUpload.idBackFile.name, { type: documentUpload.idBackFile.type }));
    } else {
      setIdBackFile(null);
    }

    if (documentUpload.additionalFiles) {
      setAdditionalDocuments(documentUpload.additionalFiles.map(info => new File([], info.name, { type: info.type })));
    } else {
      setAdditionalDocuments([]);
    }
  }, [documentUpload]);


  const [idFrontFile, setIdFrontFile] = useState<File | null>(null);
  const idFrontPreviewRef = useRef<HTMLImageElement>(null);
  const [idBackFile, setIdBackFile] = useState<File | null>(null);
  const idBackPreviewRef = useRef<HTMLImageElement>(null);
  const [additionalDocuments, setAdditionalDocuments] = useState<File[]>([]);


  const handleFileChange = (file: File | null, setFile: React.Dispatch<React.SetStateAction<File | null>>, previewRef: React.RefObject<HTMLImageElement | null>, type: string) => {
    if (file) {
      const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];
      const allowedTypesText = ".jpg,.png,.pdf"

      if (allowedTypes.includes(file.type)) {
        setFile(file);
        displayPreview(file, idFrontPreviewRef.current);
      } else {
        setVisalbe(true)
        setMessage(`File type not allowed. Please select ${allowedTypesText} file.`)
        setFile(null);
      }
    } else {
      if (type === 'front') {
        dispatch(setIdFrontFileInfo(null));
      } else if (type === 'back') {
        dispatch(setIdBackFileInfo(null));
      }
      setFile(null);
    }
  };

  const handleAdditionalFilesChange = (files: File[]) => {
    setAdditionalDocuments(files);
  };

  const displayPreview = (file: File, previewElement: HTMLDivElement | null) => {
    if (previewElement && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewElement.innerHTML = `<img src="${reader.result}" alt="${file.name}" style="max-width: 200px; max-height: 200px;" />`;
      };
      reader.readAsDataURL(file);
    } else if (previewElement) {
      previewElement.textContent = `Selected: ${file.name}`;
    }
  };

  const [visable, setVisalbe] = useState<boolean>(false)
  const [mode, setMode] = useState<'warning' | 'info' | 'success' | 'danger'>('warning')
  const [message, setMessage] = useState<string>('')
  const handleAlertClose = () => {
    setVisalbe(false)
    setMessage('')
  };

  const [errors, setErrors] = useState<Errors>({});


  const handleBack = () => {
    dispatch(setIdFrontFileInfo(idFrontFile ? { name: idFrontFile.name, size: idFrontFile.size, type: idFrontFile.type } : null));
    dispatch(setIdBackFileInfo(idBackFile ? { name: idBackFile.name, size: idBackFile.size, type: idBackFile.type } : null));
    dispatch(setAdditionalFilesInfo(additionalDocuments.map(file => ({ name: file.name, size: file.size, type: file.type }))));

    navigate('/');
  };

  const handleNext = () => {
    const newErrors: Errors = {};
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
      setVisalbe(true);
      return;
    }

    dispatch(setIdFrontFileInfo(idFrontFile ? { name: idFrontFile.name, size: idFrontFile.size, type: idFrontFile.type } : null));
    dispatch(setIdBackFileInfo(idBackFile ? { name: idBackFile.name, size: idBackFile.size, type: idBackFile.type } : null));
    dispatch(setAdditionalFilesInfo(additionalDocuments.map(file => ({ name: file.name, size: file.size, type: file.type }))));

    navigate('/confirmation');
  };


  return (
    <section id="step2" className="form-step">
      <Alert visable={visable} mode={mode} message={message} onClose={handleAlertClose} />
      <h2>Document Upload</h2>
      <fieldset>
        <FileUpload
          label="ID Card Front"
          id="id-front"
          name="id-front"
          accept="image/jpeg, image/png	,application/pdf"
          acceptText=".jpg,.png,.pdf"
          maxSizeMB={2}
          onFileChange={(file) => handleFileChange(file, setIdFrontFile, idFrontPreviewRef, 'front')}
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
          onFileChange={(file) => handleFileChange(file, setIdBackFile, idBackPreviewRef, 'back')}
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