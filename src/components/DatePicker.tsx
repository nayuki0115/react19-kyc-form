import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import type { DatePickerProps, ValidationHandle } from '@/types/formTypes';

const DatePicker = forwardRef<ValidationHandle, DatePickerProps>(({ label, id, name, required, value, onChange, errorMessage, validationRules = [], onValidationResult, ...rest }, forwardedRef) => {
  const [localErrorMessage, setLocalErrorMessage] = useState<string | undefined>(errorMessage);

  useEffect(() => {
    setLocalErrorMessage(errorMessage);
  }, [errorMessage]);

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
    setLocalErrorMessage(undefined);
    if (onValidationResult) {
      onValidationResult(true);
    }
    return true;
  };

  useImperativeHandle(forwardedRef, () => ({
    validation: () => validate(value || ''),
  }));

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (onChange) {
      onChange(event);
    }
    validate(value);
  };

  const handleDateBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;
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
          onBlur={handleDateBlur}
          className={`${localErrorMessage ? 'error-element' : ''}`}
          {...rest}
        />
      </div>

      {localErrorMessage ? <p className="error-message">{localErrorMessage}</p> : ''}
    </div>
  );

});

export default DatePicker;
