const Select = ({ label, id, name, value, onChange, required, errorMessage, options, ...rest}: selectProps) => {
  return (
    <div className="form-group">
      <div>
        <label htmlFor={id}>
          {label}
          {required ? <span className="required">*</span> : ''}
        </label>
        <select id={id} name={name} value={value} onChange={onChange} required={required} className={`${errorMessage ? 'error-element' : ''}`} {...rest}>
          <option value="">Please select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {errorMessage ? <p className="error-message">{errorMessage}</p> : ''}
    </div>
  );
};

export default Select;