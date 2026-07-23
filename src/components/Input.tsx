import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";

const Input = forwardRef<validaHandle, inputProps>(({ id, label, name, required, value, onChange, onBlur, ...rest }, forwardedRef) => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const validate = (nextValue: string) => {
    if (required && nextValue.trim() === '') {
      setErrorMessage(`${label} is required.`);
      return false;
    }

    if (rest.type === 'email' && nextValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(nextValue.trim())) {
        setErrorMessage(`Invalid email format.`);
        return false;
      }
    }

    setErrorMessage('');
    return true;
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    validate(event.currentTarget.value);
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    validate(event.currentTarget.value);
  }

  useImperativeHandle(forwardedRef, () => ({
    validation: () => validate(value),
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
