import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";

const Select = forwardRef<validaHandle, selectProps>(({ id, label, name, required, value, options, onChange, onBlur, ...rest }, forwardedRef) => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const validate = (nextValue: string) => {
    if (required && nextValue === '') {
      setErrorMessage(`${label} is required.`);
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event);
    validate(event.currentTarget.value);
  }

  const handleSelectBlur = (event: FocusEvent<HTMLSelectElement>) => {
    onBlur?.(event);
    validate(event.currentTarget.value);
  }

  useImperativeHandle(forwardedRef, () => ({
    validation: () => validate(value),
  }));

  return (
    <div className="form-group">
      <div>
        <label htmlFor={id}>
          {label}
          {required ? <span className="required">*</span> : ''}
        </label>
        <select id={id} name={name} value={value} onChange={handleSelectChange} onBlur={handleSelectBlur} required={required} className={`${errorMessage ? 'error-element' : ''}`} {...rest}>
          <option value="" key="">Please select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
})

export default Select;
