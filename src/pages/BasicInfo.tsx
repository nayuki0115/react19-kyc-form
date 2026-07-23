import {
  useState,
  useRef,
  type ChangeEvent,
  type RefObject,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { setBasicInfoData } from '@/store/basicInfoSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type {
  AlertMode,
  BasicInfoFormData,
  ValidationHandle,
} from '@/types/formTypes';

import Input from '@/components/Input';

import Button from '@/components/Button';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import Alert from '@/components/Alert';





const BasicInfo = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const basicInfo = useAppSelector((state) => state.basicInfo);

  const [formData, setFormData] = useState<BasicInfoFormData>(basicInfo);

  const [visible, setVisible] = useState<boolean>(false)
  const mode: AlertMode = 'warning'
  const [message, setMessage] = useState<string>('')
  const handleAlertClose = () => {
    setVisible(false)
    setMessage('')
  }

  const validateRequired = (value: string | undefined, label: string): string | undefined => {
    if (!value || value.trim() === '') {
      return `${label} is required.`;
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

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, dob: value }));
  };

  
  const nameRef = useRef<ValidationHandle>(null);
  const emailRef = useRef<ValidationHandle>(null);
  const phoneRef = useRef<ValidationHandle>(null);
  const nationalityRef = useRef<ValidationHandle>(null);
  const dobRef = useRef<ValidationHandle>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    const requiredFields: RefObject<ValidationHandle | null>[] = [
      nameRef,
      emailRef,
      phoneRef,
      nationalityRef,
      dobRef,
    ];
    const validationResults = requiredFields.map(
      (ref) => ref.current?.validation() ?? false,
    );
    const hasErrors = validationResults.some((isValid) => !isValid);

    if(hasErrors) {
      setVisible(true)
      setMessage('Please enter the required fields')
    }else {
      setVisible(false);
      setMessage('');
      dispatch(setBasicInfoData(formData));
      navigate('/document-upload');
    }

  }


  const nationalityOptions = [
    { value: 'TW', label: 'Taiwan' },
    { value: 'US', label: 'United States' },
    { value: 'CN', label: 'China' },
    { value: 'JP', label: 'Japan' },
  ];

  return (
    <section id="step1">
      <Alert visible={visible} mode={mode} message={message} onClose={handleAlertClose} />
      <h2>Basic Information</h2>
      <fieldset>
        <Input label='Name' id='name' type='text' name='name' required value={formData.name} onChange={handleInputChange} ref={nameRef} />
        <Input label='Email' id='email' type='email' name='email' required value={formData.email} onChange={handleInputChange} ref={emailRef} />
        <Input label="Phone" id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} ref={phoneRef} />
        <Select label="Nationality" id="nationality" name="nationality" required options={nationalityOptions} value={formData.nationality} onChange={handleSelectChange} ref={nationalityRef} />
        <Input label="Address" id="address" name="address" type="text" value={formData.address!} onChange={handleInputChange} />
        <DatePicker
          label="Date of Birth"
          id="dob"
          name="dob"
          required
          value={formData.dob}
          onChange={handleDateChange}
          validationRules={[
            (v: string) => validateRequired(v, 'Date of Birth') || validateAge(v)
          ]}
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
