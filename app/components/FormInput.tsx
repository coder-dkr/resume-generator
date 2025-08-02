import Image from 'next/image';
import React from 'react';


interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label,placeholder, error, required = false, ...props }) => {
  const getIcon = () => {
    switch (props.name) {
      case 'name':
        return <Image width={24} height={24} alt="user" src="/svgs/user.svg" />;
      case 'email':
        return <Image width={24} height={24} alt="user" src="/svgs/mail.svg" />;
      case 'phone':
        return <Image width={24} height={24} alt="user" src="/svgs/phone-call.svg" />;
      case 'position':
        return <Image width={24} height={24} alt="user" src="/svgs/position.svg" />;
      case 'description':
        return <Image width={24} height={24} alt="user" src="/svgs/description.svg" />;
      case 'fileName':
        return <Image width={24} height={24} alt="user" src="/svgs/description.svg" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-black">
          {getIcon()}
        </div>
        <input
          {...props}
          placeholder={placeholder}
          className="pl-12 mt-1 block w-full px-3 py-3 border  text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormInput;
