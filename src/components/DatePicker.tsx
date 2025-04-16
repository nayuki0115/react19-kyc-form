import { useState } from "react";

const DatePicker = ({ label, id, name, required, value, onChange, errorMessage, validationRules = [], onValidationResult, ...rest }: datePickerProps) => {
  const [localErrorMessage, setLocalErrorMessage] = useState<string | undefined>(errorMessage);

  const validate = (dateString: string) => {
    for (const rule of validationRules) {
      const message = rule(dateString);
      if (message) {
        setLocalErrorMessage(message);
        if (onValidationResult) {
          onValidationResult(false, message);
        }
        return false;
      }
    }
    setLocalErrorMessage(errorMessage);
    if (onValidationResult) {
      onValidationResult(true);
    }
    return true;
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (onChange) {
      onChange(event);
    }
    validate(value);
  };

  return (
    <div className="form-group">
      <div>
        <label htmlFor={id}>
          {label}
          {required ? <span className="required">*</span> : ''}
        </label>
        <input
          type="date"
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={handleDateChange}
          className={`${errorMessage ? 'error-element' : ''}`}
          {...rest}
        />
      </div>

      {localErrorMessage ? <p className="error-message">{localErrorMessage}</p> : ''}
    </div>
  );

}

export default DatePicker;