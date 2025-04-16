'use client';

import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectOptionProps {
  options?: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  options = [],
  value = '',
  onChange = () => {},
  placeholder = "Select...",
  className = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const handleSelect = (selectedValue: string) => {
    setInternalValue(selectedValue);
    onChange(selectedValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.value === internalValue)?.label || placeholder;

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className={`w-full flex items-center justify-between px-4 py-2 border rounded-md shadow-sm text-left ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className={`${!internalValue ? 'text-gray-400' : ''}`}>
          {selectedLabel}
        </span>
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  internalValue === option.value ? 'bg-blue-50 text-blue-600' : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectOption;