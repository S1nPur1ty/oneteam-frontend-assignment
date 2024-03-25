'use client'
import { FormEventHandler } from 'react';

interface TextFieldProps {
  value?: string | number;
  prependLabel?: string;
  type?: string;
  pattern?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  onPaste?: (pastedText: string) => void;
  onInput?: FormEventHandler<HTMLInputElement> | undefined;
}

export const TextField: React.FC<TextFieldProps> = ({
  value,
  type = 'text',
  onInput,
  pattern,
  placeholder,
  onChange,
  onPaste,
  prependLabel,
  className = '',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;

    if (onChange) onChange(targetValue);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData('text');
    
    if ( onPaste ) 
      onPaste(pastedText);

    event.preventDefault();
  };

  return (
    <div className={`flex items-center border-[#2f333b] border-[1px] px-5 h-11 rounded-full w-full ${className}`}>
      { prependLabel && <span className='text-sm md:text-base text-red-500'>{prependLabel}</span> }
      <input
        type={type}
        className={`bg-transparent text-sm md:text-base w-full`}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        pattern={pattern}
        onInput={onInput}
        onPaste={handlePaste}
      />
    </div>
  );
};