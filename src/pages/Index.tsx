import StepIndicator from "@/components/StepIndicator";
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [idFrontFile, setIdFrontFile] = useState<File | null>(null);
  const [idBackFile, setIdBackFile] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);

  const clearDocumentFiles = () => {
    setIdFrontFile(null);
    setIdBackFile(null);
    setAdditionalFiles([]);
  };

  const totalSteps = ['Basic Information', 'Document Upload', 'Confirmation']
  const totalStepsPath = ['/', '/document-upload', '/confirmation']
  const handleCurrentStep = () => {
    const pathName = location.pathname
    const flag = totalStepsPath.indexOf(pathName) !== -1 ? Number(totalStepsPath.indexOf(pathName))+1 : 1
    return flag
  }
  const handleStepClick = (index: number) => {
    const tempIndex = Number(index) - 1
    navigate(`${totalStepsPath[tempIndex]}`)
  }
  return (
    <div className="kyc-container">
      <h1>KYC (Know Your Customer) Process</h1>
      <StepIndicator currentStep={handleCurrentStep()} totalSteps={totalSteps} onStepClick={handleStepClick}/>
      <section className="kyc-form">
      <form id="kyc-form" encType="multipart/form-data">
        <Outlet context={{
          idFrontFile,
          setIdFrontFile,
          idBackFile,
          setIdBackFile,
          additionalFiles,
          setAdditionalFiles,
          clearDocumentFiles,
        }} />
      </form>
      </section>
    </div>
  );
}


export default Index;
