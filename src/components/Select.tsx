import React, { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  label?: string;
  error?: string;
  onChange: (value: string) => void;
}

const SelectLabel: React.FC<{ id?: string; label?: string }> = ({ id, label }) => {
  if (!label) return null;
  
  return (
    <label 
      htmlFor={id} 
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
  );
};

const ErrorMessage: React.FC<{ error?: string }> = ({ error }) => {
  if (!error) return null;
  
  return (
    <p className="mt-1 text-sm text-red-500">{error}</p>
  );
};

const getSelectClassName = (baseClassName: string, hasError: boolean) => {
  const classes = [
    'w-full px-4 py-2 border rounded-lg appearance-none',
    'focus:ring-2 focus:ring-blue-500 focus:outline-none',
    'disabled:bg-gray-100 disabled:cursor-not-allowed',
    hasError ? 'border-red-500' : '',
    baseClassName
  ];

  return classes.filter(Boolean).join(' ');
};

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  error,
  className = '',
  id,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <SelectLabel id={id} label={label} />
      <select
        {...props}
        id={id}
        onChange={handleChange}
        className={getSelectClassName(className, !!error)}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <ErrorMessage error={error} />
    </div>
  );
};