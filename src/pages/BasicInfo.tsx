import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setBasicInfoData } from '@/store/basicInfoSlice'; // 確保路徑正確
import { RootState, AppDispatch } from '@/store/store'; // 導入 RootState 和 AppDispatch 类型
import { useDispatch, useSelector } from 'react-redux';

import Input from '@/components/Input';
import Button from '@/components/Button';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import Alert from '@/components/Alert';

const BasicInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const basicInfo = useSelector((state: RootState) => state.basicInfo);

  const [formData, setFormData] = useState<formDataType>(basicInfo);

  const [visable, setVisalbe] = useState<boolean>(false)
  const [mode, setMode] = useState<'warning' | 'info' | 'success' | 'danger'>('warning')
  const [message, setMessage] = useState<string>('')
  const handleAlertClose = () => {
    setVisalbe(false)
    setMessage('')
  }

  const [errors, setErrors] = useState<Errors>({});

  const validateRequired = (value: string | undefined, label: string): string | undefined => {
    if (!value || value.trim() === '') {
      return `${label} is required.`;
    }
    return undefined;
  };

  const validateEmail = (value: string | undefined): string | undefined => {
    if (value && !/\S+@\S+\.\S+/.test(value)) {
      return 'Invalid email format.';
    }
    return undefined;
  };

  const validateAge = (dateString: string): string | undefined => {
    if (!dateString) {
      return undefined;
    }
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18 || age > 85) {
      return 'Must be between 18 and 85 years old';
    }
    return undefined;
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const label = name.charAt(0).toUpperCase() + name.slice(1);
    let errorMessage: string | undefined;
    if (event.target.required) {
      errorMessage = validateRequired(value, label);
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };


  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const label = name.charAt(0).toUpperCase() + name.slice(1);
    let errorMessage: string | undefined;
    if (event.target.required) {
      errorMessage = validateRequired(value, label);
    }
    if (name === 'email' && value) {
      const emailError = validateEmail(value);
      if (emailError) {
        errorMessage = emailError;
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, dob: value }));
    const ageError = validateAge(value);
    setErrors((prevErrors) => ({ ...prevErrors, dob: ageError }));
  };

  const handleNext = () => {
    const newErrors: Errors = {};
    let hasErrorsFlag = false;

    for (const key in formData) {
      const value = formData[key];
      let errorMessage: string | undefined;
      const label = key.charAt(0).toUpperCase() + key.slice(1);

      switch (key) {
        case 'name':
        case 'phone':
          errorMessage = validateRequired(value, label);
          break;
        case 'email':
          errorMessage = validateRequired(value, label) || validateEmail(value);
          break;
        case 'dob':
          errorMessage = validateRequired(value, 'Date of Birth') || validateAge(value);
          break;
        default:
          break;
      }

      if (errorMessage) {
        newErrors[key] = errorMessage;
        hasErrorsFlag = true;
        setVisalbe(true)
        setMessage('Please enter the required fields')
      }

    };

    setErrors(newErrors);

    if (!hasErrorsFlag) {
      dispatch(setBasicInfoData(formData))
      navigate('/document-upload');
    }
  }

  const nationalityOptions = [
    { value: 'TW', label: 'Taiwan' },
    { value: 'US', label: 'United States' },
    { value: 'CN', label: 'China' },
    { value: 'JP', label: 'Japan' },
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ];



  return (
    <section id="step1">
      <Alert visable={visable} mode={mode} message={message} onClose={handleAlertClose} />
      <h2>Basic Information</h2>
      <fieldset>
        <Input label="Name" id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} onBlur={handleInputBlur} errorMessage={errors.name} />
        <Input label="Email" id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} onBlur={handleInputBlur} errorMessage={errors.email} />
        <Input label="Phone" id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} onBlur={handleInputBlur} errorMessage={errors.phone} />
        <Select label="Nationality" id="nationality" name="nationality" required options={nationalityOptions} value={formData.nationality} onChange={handleSelectChange} errorMessage={errors.nationality} />
        <Select label="Gender" id="gender" name="gender" options={genderOptions} value={formData.gender} onChange={handleSelectChange} />
        <Input label="Address" id="address" name="address" type="text" value={formData.address!} onChange={handleInputChange} />
        <DatePicker
          label="Date of Birth"
          id="dob"
          name="dob"
          required
          value={formData.dob}
          onChange={handleDateChange}
          errorMessage={errors.dob}
        />
      </fieldset>
      <div className="form-actions">
        <Button className='next-btn' variant="primary"  type="button" onClick={handleNext}>Next</Button>
      </div>
    </section>
  );
};

export default BasicInfo;