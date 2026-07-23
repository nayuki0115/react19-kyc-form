import type {
  ButtonHTMLAttributes,
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  value: string;
}

export interface ValidationHandle {
  validation: () => boolean;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'success';
  className: string;
  children: ReactNode;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  name: string;
  value: string;
  options: SelectOption[];
}

export interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  validationRules?: ((dateString: string) => string | undefined)[];
  onValidationResult?: (isValid: boolean, message?: string) => void;
}

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: string[];
  onStepClick?: (step: number) => void;
}

export interface FileUploadProps {
  label: string;
  id: string;
  name: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  acceptText?: string;
  maxSizeMB?: number;
  preview?: boolean;
  required?: boolean;
  errorMessage?: string;
}

export interface MultiFileUploadProps {
  label: string;
  id: string;
  name: string;
  files: File[];
  onFileChange: (files: File[]) => void;
  accept?: string;
  acceptText?: string;
  maxSizeMB?: number;
  preview?: boolean;
  required?: boolean;
  errorMessage?: string;
}

export interface BasicInfoFormData {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  gender?: string;
  address?: string;
  dob: string;
}

export type AlertMode = 'warning' | 'info' | 'success' | 'danger';

export interface AlertProps {
  visible: boolean;
  mode: AlertMode;
  message: string;
  onClose?: () => void;
}

export interface DocumentUploadErrors {
  idFront?: string;
  idBack?: string;
}
