import React, { useImperativeHandle, useState, forwardRef, ChangeEvent, FocusEvent, useEffect, useRef } from "react";

const Select = forwardRef<validaHandle, selectProps>(({ id, label, name, required, value, options, onChange, ...rest }, forwardedRef) => {
  const { type } = rest
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [selectedValue, setSelectedValue] = useState<string>(value)
  const isInitialRender = useRef(true);

  const handleValidation = () => {
    if (required && selectedValue === "") {
      setErrorMessage(`${label} is required.`);
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (onChange) {
      onChange(event);
    }
    setSelectedValue(selectedValue)
    handleValidation();
  }

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false; // 初次渲染完成後設置為 false
    } else {
      handleValidation(); // 在後續的 selectedValue 變化時觸發驗證
    }
  }, [selectedValue, required])

  useImperativeHandle(forwardedRef, () => ({
    validation: handleValidation,
  }));

  return (
    <div className="form-group">
      <div>
        <label htmlFor={id}>
          {label}
          {required ? <span className="required">*</span> : ''}
        </label>
        <select id={id} name={name} value={value} onChange={handleSelectChange} required={required} className={`${errorMessage ? 'error-element' : ''}`} {...rest}>
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

// const Select = ({ label, id, name, value, onChange, required, errorMessage, options, ...rest}: selectProps) => {
//   return (
//     <div className="form-group">
//       <div>
//         <label htmlFor={id}>
//           {label}
//           {required ? <span className="required">*</span> : ''}
//         </label>
//         <select id={id} name={name} value={value} onChange={onChange} required={required} className={`${errorMessage ? 'error-element' : ''}`} {...rest}>
//           <option value="">Please select</option>
//           {options.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//     </div>
//   );
// };

export default Select;