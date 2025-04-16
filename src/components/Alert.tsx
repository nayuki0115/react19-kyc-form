const Alert = ({ visable, mode, message, onClose, ...rest }: AlertType) => {
  const alertMode = mode.toUpperCase();
  const alertClass = `alert alert-${mode}`;
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {visable ?
        <div className={alertClass}>
          {message}
          { onClose ?  <button onClick={handleClose} className="close-button">×</button> : ''}
          
        </div>
        :
        ''
      }

    </>

  )
}

export default Alert;