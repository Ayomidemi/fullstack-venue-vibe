/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.scss';

interface OTPInputProps {
  helperText?: string;
  pin: string;
  onChange: (value: string) => void;
  numInputs: number;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  hasError?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
  helperText,
  pin,
  onChange,
  numInputs,
  containerStyle,
  inputStyle,
  hasError,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(numInputs).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(numInputs).fill(null));

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);
    onChange(updatedOtp.join(''));

    if (value && index < numInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, numInputs)?.split('');

    const updatedOtp = [...otp];
    pasteData.forEach((digit, i) => {
      updatedOtp[i] = digit;
    });

    setOtp(updatedOtp);

    // Focus on the last filled input
    const lastFilledIndex = pasteData.length - 1;
    if (lastFilledIndex < numInputs) {
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  useEffect(() => {
    setOtp(pin?.split('').concat(Array(numInputs - pin?.length).fill('')));
  }, [pin, numInputs]);

  useEffect(() => {
    const otpValue = otp.join('');
    if (otpValue !== pin) {
      onChange(otpValue);
    }
  }, [otp, onChange, pin]);

  return (
    <>
      <div className={styles.otp_container} style={containerStyle}>
        {otp?.map((digit, index) => (
          <input
            key={index}
            ref={(el: any) => (inputRefs.current[index] = el)}
            type="text"
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => e.key === 'Backspace' && handleBackspace(index)}
            onPaste={handlePaste}
            className={`${styles.otp_input} ${hasError ? styles.error : ''}`}
            style={inputStyle}
          />
        ))}
      </div>

      {helperText && <p className={styles.helper_text}>{helperText}</p>}
    </>
  );
};

export default OTPInput;
