import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from '@/store/store'
import { useDispatch, useSelector } from "react-redux";
import { setBasicInfoData } from '@/store/basicInfoSlice'; // 確保路徑正確
import { setIdFrontFileInfo, setIdBackFileInfo, setAdditionalFilesInfo } from "@/store/documentUploadSlice.ts";

import Alert from '@/components/Alert';
import { useState } from "react";

const Confirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basicInfo = useSelector((state: RootState) => state.basicInfo);
  const documentUpload = useSelector((state: RootState) => state.documentUpload);
  console.log('documentUpload', documentUpload)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleBack = () => {
    navigate('/document-upload');
  }

  const [visable, setVisalbe] = useState<boolean>(false)
  const [mode, setMode] = useState<'warning' | 'info' | 'success' | 'danger'>('success')
  const [message, setMessage] = useState<string>('')
  const handleAlertClose = () => {
    setVisalbe(false)
    setMessage('')
  };

  const handleSubmit = () => {
    setVisalbe(true)
    setMessage('Data has been submitted successfully.')

    dispatch(setBasicInfoData({
      name: '',
      email: '',
      phone: '',
      nationality: '',
      gender: '',
      address: '',
      dob: '',
    }))
    dispatch(setIdFrontFileInfo(null))
    dispatch(setIdBackFileInfo(null))
    dispatch(setAdditionalFilesInfo([]))
  }


  return (
    <section id="step3" className="form-step">
      <Alert visable={visable} mode={mode} message={message} onClose={handleAlertClose} />
      <h2>Confirmation Page</h2>
      <fieldset>
        <div className="preview-section">
          <h3>Basic Information</h3>
          <p><strong>Name:</strong> <span id="preview-name">{basicInfo.name}</span></p>
          <p><strong>Email:</strong> <span id="preview-email">{basicInfo.email}</span></p>
          <p><strong>Phone:</strong> <span id="preview-phone">{basicInfo.phone}</span></p>
          <p><strong>Nationality:</strong> <span id="preview-nationality">{basicInfo.nationality}</span></p>
          <p><strong>Gender:</strong> <span id="preview-gender">{basicInfo.gender !== '' ? basicInfo.gender : '-'}</span></p>
          <p><strong>Address:</strong> <span id="preview-address">{basicInfo.address !== '' ? basicInfo.address : '-'}</span></p>
          <p><strong>Date of Birth:</strong> <span id="preview-dob">{basicInfo.dob}</span></p>
        </div>
        <div className="preview-section">
          <h3>Document Upload</h3>
          <p><strong>ID Card Front:</strong>
            {documentUpload.idFrontFile ? (
              <span id="preview-id-front">
                {documentUpload.idFrontFile.name} ({formatFileSize(documentUpload.idFrontFile.size)})
              </span>
            ) : (
              <span>No file uploaded</span>
            )}</p>
          <p><strong>ID Card Back:</strong>
            {documentUpload.idBackFile ? (
              <span id="preview-id-back">
                {documentUpload.idBackFile.name} ({formatFileSize(documentUpload.idBackFile.size)})
              </span>
            ) : (
              <span>No file uploaded</span>
            )}
          </p>
          <p><strong>Additional Documents:</strong>
            {/* <span id="preview-additional-docs"></span> */}
            {documentUpload.additionalFiles && documentUpload.additionalFiles.length > 0 && (
              <div>
                <ul>
                  {documentUpload.additionalFiles.map((file, index) => (
                    <li key={index}>
                      {file.name} ({formatFileSize(file.size)})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </p>
        </div>
      </fieldset>
      <div className="form-actions">
        <button type="button" className="back-btn" onClick={handleBack}>Back</button>
        <button type="button" className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </section>
  );
}

export default Confirmation;