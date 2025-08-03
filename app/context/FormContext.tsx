'use client';

import { createContext, useContext, useState } from 'react';
import { validateEmail , validatePhone } from '@/app/utils/validation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  description: string;
  fileName: string;
}

interface FormContextType {
  formData: FormData;
  setFormData: (data: FormData) => void;
  errors: Record<string, string>;
  validateForm: () => boolean;
  resetForm: () => void
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    position: '',
    description: '',
    fileName: 'my-resume'
  });

  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone must be at least 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSetFormData = (data: FormData) => {
    setFormData(data);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      description: '',
      fileName: 'my-resume'
    });
    setErrors({});
  };

  return (
    <FormContext.Provider value={{ 
      formData, 
      setFormData: handleSetFormData, 
      errors, 
      validateForm ,
      resetForm
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}

// Helper functions
