import React, { useImperativeHandle, useState, forwardRef, ChangeEvent, FocusEvent } from "react";

const Input = forwardRef<validaHandle, inputProps>(({ id, label, name, required, value, onChange, ...rest }, forwardedRef) => {
  const { type } = rest
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleValidation = () => {
    if (required && (!value || value.trim() === '')) {
      setErrorMessage(`${label} is required.`);
      return false; 
    }

    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        setErrorMessage(`Invalid email format.`);
        return false; 
      }
    }
    setErrorMessage('');
    return true;
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (required) {
      handleValidation();
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
    handleValidation();
  }


  useImperativeHandle(forwardedRef, () => ({
    validation: handleValidation,
  }));


  return (
    <div className="form-group">
      <div>
        <label htmlFor={id}>{label}
          {required ? <span className="required">*</span> : ''}
        </label>
        <input id={id} name={name} value={value} required={required} className={`${errorMessage ? 'error-element' : ''}`} onBlur={handleInputBlur} onChange={handleInputChange} {...rest} />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  )
})

export default Input
