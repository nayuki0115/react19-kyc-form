import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { setBasicInfoData } from '@/store/basicInfoSlice';
import { RootState, AppDispatch } from '@/store/store'; 
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


  
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  //   setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  // };

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));

  //   const label = name.charAt(0).toUpperCase() + name.slice(1);
  //   let errorMessage: string | undefined;
  //   if (event.target.required) {
  //     errorMessage = validateRequired(value, label);
  //   }
  //   setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  // };


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
  };

  
  const nameRef = useRef<validaHandle>(null);
  const emailRef = useRef<validaHandle>(null);
  const phoneRef = useRef<validaHandle>(null);
  const dobRef = useRef<validaHandle>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(`Select ${name} changed to: ${value}`);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    let errors: boolean[] = [];
    const requiredColumns: React.RefObject<validaHandle | null>[] = [nameRef, emailRef, phoneRef, dobRef]

    requiredColumns.forEach(ref => {
      if (ref.current && typeof ref.current.validation === 'function') {
        const isValid = ref.current.validation();
        if (!isValid) {
          errors.push(false);
        }
      }
    });


    let alertFlag = errors.some(item => item === false)
    if(alertFlag) {
      setVisalbe(true)
      setMessage('Please enter the required fields')
    }else {
      setVisalbe(false);
      setMessage('');
      // validation passed -> save to redux and go to next step
      dispatch(setBasicInfoData(formData));
      navigate('/document-upload');
    }

    // if (!hasErrorsFlag) {
    //   dispatch(setBasicInfoData(formData))
    //   navigate('/document-upload');
    // }
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
        <Input label='Name' id='name' type='text' name='name' required value={formData.name} onChange={handleInputChange} ref={nameRef} />
        <Input label='Email' id='email' type='email' name='email' required value={formData.email} onChange={handleInputChange} ref={emailRef} />
        <Input label="Phone" id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} ref={phoneRef} />
        <Select label="Nationality" id="nationality" name="nationality" required options={nationalityOptions} value={formData.nationality} onChange={handleSelectChange} /> 

      
        {/* <Select label="Nationality" id="nationality" name="nationality" required options={nationalityOptions} value={formData.nationality} onChange={handleSelectChange} errorMessage={errors.nationality} /> */}
        {/* <Select label="Gender" id="gender" name="gender" options={genderOptions} value={formData.gender} onChange={handleSelectChange} /> */}
        <Input label="Address" id="address" name="address" type="text" value={formData.address!} onChange={handleInputChange} />
        <DatePicker
          label="Date of Birth"
          id="dob"
          name="dob"
          required
          value={formData.dob}
          onChange={handleDateChange}
          errorMessage={errors.dob}
          validationRules={[
            (v: string) => validateRequired(v, 'Date of Birth') || validateAge(v)
          ]}
          onValidationResult={(isValid: boolean, message?: string) => {
            setErrors((prev) => ({ ...prev, dob: isValid ? undefined : message }));
          }}
          ref={dobRef}
        />
      </fieldset>
      <div className="form-actions">
        <Button className='next-btn' variant="primary"  type="button" onClick={handleNext}>Next</Button>
      </div>
    </section>
  );
};

export default BasicInfo;