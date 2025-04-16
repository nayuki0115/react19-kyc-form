interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  value: string;
  required?: boolean;
  onBlurValidation?: (isValid: boolean, message?: string) => void;
  errorMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

interface buttonProps {
  variant: 'primary' | 'secondary' | 'success';
  className: string ;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

interface selectOption {
  value: string;
  label: string;
}
interface selectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  errorMessage?: string;
  options: selectOption[];
  onChangeValidation?: (isValid: boolean, message?: string) => void;
}

interface datePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  errorMessage?: string;
  validationRules?: ((dateString: string) => string | undefined)[]; // 接收驗證規則
  onValidationResult?: (isValid: boolean, message?: string) => void; // 通知父組件驗證結果
}

interface stepIndicatorProps {
  currentStep: number;
  totalSteps: string[];
  onStepClick?: (step: number) => React.MouseEventHandler<HTMLDivElement>;
}

interface fileUploadProps {
  label: string;
  id: string;
  name: string;
  onFileChange: (file: File | null) => void; 
  accept?: string;
  acceptText?: string;
  maxSizeMB?: number;
  preview?: boolean;
  required?: boolean;
  errorMessage?: string;
  fileInfo?: uploadFileInfo | null;
}
interface mulitFileUploadProps {
  label: string;
  id: string;
  name: string;
  onFileChange: (files: File[]) => void;
  accept?: string;
  acceptText?: string;
  maxSizeMB?: number;
  preview?: boolean;
  required?: boolean;
  errorMessage?: string;
  filesInfo?: uploadFileInfo[]; 
}

interface formDataType {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  gender?: string;
  address?: string;
  dob: string;
  [key: string]: string;
}

interface AlertType {
  visable: boolean;
  mode: 'warning' | 'info' | 'success' | 'danger';
  message: string;
  onClose?: () => void
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  nationality?: string;
  gender?: string;
  address?: string;
  dob?: string;
  [key: string]: string | undefined; 
}

interface uploadFileInfo {
  name: string;
  size: number;
  type: string;
}

interface DocumentUploadState {
  idFrontFile: uploadFileInfo | null;
  idBackFile: uploadFileInfo | null;
  additionalFiles: uploadFileInfo[];
}