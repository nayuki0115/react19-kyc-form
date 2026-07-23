import type { AlertProps } from '@/types/formTypes';

const Alert = ({ visible, mode, message, onClose }: AlertProps) => {
  const alertClass = `alert alert-${mode}`;
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {visible ?
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
