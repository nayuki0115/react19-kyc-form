const  StepIndicator = ({currentStep, totalSteps, onStepClick}: stepIndicatorProps) => {
  const getStepClassName = (index: number): string => {
    const baseClassName = 'step';
    const completedClassName = index + 1 < currentStep ? 'completed' : '';
    const activeClassName = index + 1 === currentStep ? 'active' : '';

    return `${baseClassName} ${completedClassName} ${activeClassName}`.trim();
  };

  const handleStepClick = (index: number) => {
    if(onStepClick) {
      onStepClick(index)
    }
  }

  return (
    <section className="step-indicator">
      {
        totalSteps.map((label: string, index: number) => {
          return (
            <div className={getStepClassName(index)} key={`indicator-${index}`} onClick={() => handleStepClick(index+1)}>
              <div className="step-icon">{index + 1}</div>
              <p>{label}</p>
            </div>
            )
        })
      }
    </section>
  )
}

export default StepIndicator;