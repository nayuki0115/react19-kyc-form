const Input = ({ label, id, name, required, errorMessage, value, onChange, ...rest }: inputProps) => {
  return (
    <div className="form-group">
      <div>
        <label htmlFor={id}>{label}
          {required ? <span className="required">*</span> : ''}
        </label>
        <input id={id} name={name} value={value} onChange={onChange} required={required} className={`${errorMessage ? 'error-element' : ''}`} {...rest} />
      </div>

      {errorMessage ? <p className="error-message">{errorMessage}</p> : ''}
    </div>
  )
}

export default Input