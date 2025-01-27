/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import styles from './index.module.scss';
import { Password, PasswordHide } from '../UI/icons/icons';

interface PhoneInputProps {
  label?: string;
  defaultValue?: string;
  helperText?: string;
  type?: string;
  onChange: (val: any) => void;
  name?: string;
  trim?: boolean;
  maxLength?: number;
  styles?: React.CSSProperties;
  required?: boolean;
  size?: string;
  preffix?: string;
  error?: boolean;
  placeholder?: string;
  disabled?: boolean;
  active?: boolean;
  id?: string;
  placeInputRef?: React.RefObject<HTMLInputElement>;
  code: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  defaultValue,
  helperText,
  type,
  onChange,
  name,
  trim,
  maxLength,
  styles: customStyles,
  required,
  preffix,
  error,
  placeholder,
  disabled,
  active,
  id,
  placeInputRef,
  code,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | any>(null);
  const inputWrapRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const isActive = (inputValue && inputValue?.length > 0) || isOpen || active;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (trim) {
      value = value?.replace(/[^a-zA-Z0-9]/g, '');
    }

    if (name === 'firstName' || name === 'lastName') {
      value = value.replace(/[^a-zA-Z\s-]/g, '');
    }

    setInputValue(value);
    onChange({ value, name: name || '' });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (disabled) return;
      if (
        inputWrapRef.current &&
        !inputWrapRef.current.contains(event.target as Node) &&
        inputRef.current?.value?.length === 0
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [disabled]);

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
      setIsOpen(true);
    } else {
      setInputValue(null);
    }
  }, [defaultValue]);

  return (
    <>
      <div
        ref={inputWrapRef}
        className={`${styles.input_wrap} ${error && styles.error} `}
        onClick={() => setIsOpen(true)}>
        <p
          className={styles.label}
          style={{ color: '#00000099' }}
          onClick={() => inputRef.current?.focus()}>
          {label}
          {required && <span style={{ color: 'red', marginLeft: '2px' }}>*</span>}
        </p>

        <p className={styles.phone_code}>{code}</p>

        <input
          type={showPassword ? 'text' : type}
          onChange={handleInputChange}
          ref={(el) => {
            inputRef.current = el;
            if (placeInputRef) {
              (placeInputRef as any).current = el;
            }
          }}
          value={inputValue || ''}
          maxLength={maxLength}
          style={customStyles}
          className={styles.input}
          placeholder={placeholder}
          id={id}
          disabled={disabled}
        />
        {preffix && isOpen && <span className={styles.preffix}>{preffix}</span>}
        {preffix && !isOpen && isActive && <span className={styles.preffix}>{preffix}</span>}
      </div>
      {helperText && (
        <p
          style={{
            paddingLeft: '17px',
            marginTop: '5px',
            fontSize: '12px',
            color: '#d32f2f',
            marginBottom: '0px',
            textAlign: 'left',
          }}>
          {helperText}
        </p>
      )}
    </>
  );
};

export default PhoneInput;
