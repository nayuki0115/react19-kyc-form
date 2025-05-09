import StepIndicator from "@/components/StepIndicator";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const totalSteps = ['Basic Information', 'Document Upload', 'Confirmation']
  const totalStepsPath = ['/', '/document-upload', '/confirmation']
  const handleCurrentStep = () => {
    const pathName = location.pathname
    let flag = totalStepsPath.indexOf(pathName) !== -1 ? Number(totalStepsPath.indexOf(pathName))+1 : 1
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
        <Outlet />
      </form>
      </section>
    </div>
  );
}


export default Index;