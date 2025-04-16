const typeToClassName = {
  primary: 'next-btn',
  secondary: 'back-btn',
  success: 'submit-btn',
};

const Button = ({ variant = 'primary', children, className, onClick,  ...rest }: buttonProps) => {
  let buttonClassName = 'button';

  const typeClassName = typeToClassName[variant];
  if (typeClassName) {
    buttonClassName += ` ${typeClassName}`;
  }

  if (className) {
    buttonClassName += ` ${className}`;
  }

  return (
    <button className={buttonClassName} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;