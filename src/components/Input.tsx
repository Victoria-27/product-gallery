import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  label?: string;
}

const InputLabel: React.FC<{ htmlFor?: string; label?: string }> = ({ htmlFor, label }) => {
  if (!label) return null;
  
  return (
    <label 
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
  );
};

const InputIcon: React.FC<{ icon?: React.ReactNode }> = ({ icon }) => {
  if (!icon) return null;

  return (
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      {icon}
    </div>
  );
};

const ErrorMessage: React.FC<{ error?: string }> = ({ error }) => {
  if (!error) return null;

  return (
    <p className="mt-1 text-sm text-red-500">{error}</p>
  );
};

const getInputClassName = (baseClassName: string, hasIcon: boolean, hasError: boolean) => {
  const classes = [
    baseClassName,
    'w-full px-4 py-2 border rounded-lg transition-all',
    'focus:ring-2 focus:ring-blue-500 focus:outline-none',
    'disabled:bg-gray-100 disabled:cursor-not-allowed',
    hasIcon ? 'pl-10' : '',
    hasError ? 'border-red-500' : '',
  ];

  return classes.filter(Boolean).join(' ');
};

export const Input: React.FC<InputProps> = ({
  className = '',
  icon,
  error,
  label,
  id,
  ...props
}) => {
  const inputClassName = getInputClassName(className, !!icon, !!error);

  return (
    <div className="relative">
      <InputLabel htmlFor={id} label={label} />
      
      <div className="relative">
        <InputIcon icon={icon} />
        <input {...props} id={id} className={inputClassName} />
      </div>
      
      <ErrorMessage error={error} />
    </div>
  );
};