import React, { useEffect, useRef, useState } from 'react'

interface OtpInputProps {
  otpLength?: number;
  onOtpChange?: (otp: string) => void;
  disbled?: boolean;
  disabled?: boolean;
}

const OtpInput = ({ otpLength = 6, onOtpChange, disbled, disabled }: OtpInputProps) => {
  const length = Math.max(1, otpLength);
  const [values, setValues] = useState<string[]>(() => Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (onOtpChange) onOtpChange(values.join(''));
  }, [values, onOtpChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value;
    if (!val) {
      setValues(prev => {
        const next = [...prev];
        next[idx] = '';
        return next;
      });
      return;
    }

    const char = val[0];
    setValues(prev => {
      const next = [...prev];
      next[idx] = char;
      return next;
    });

    const nextIdx = idx + 1;
    if (nextIdx < length) {
      const nextInput = inputsRef.current[nextIdx];
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    const key = e.key;
    const target = e.currentTarget as HTMLInputElement;
    if (key === 'Backspace') {
      if (target.value === '') {
        const prevIdx = idx - 1;
        if (prevIdx >= 0) {
          const prevInput = inputsRef.current[prevIdx];
          if (prevInput) prevInput.focus();
          setValues(prev => {
            const next = [...prev];
            next[prevIdx] = '';
            return next;
          });
        }
      } else {
        setValues(prev => {
          const next = [...prev];
          next[idx] = '';
          return next;
        });
      }
    } else if (key === 'ArrowLeft') {
      const prevIdx = idx - 1;
      if (prevIdx >= 0) {
        const prevInput = inputsRef.current[prevIdx];
        if (prevInput) prevInput.focus();
      }
    } else if (key === 'ArrowRight') {
      const nextIdx = idx + 1;
      if (nextIdx < length) {
        const nextInput = inputsRef.current[nextIdx];
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('Text').slice(0, length);
    if (!paste) return;
    const chars = paste.split('').slice(0, length);
    setValues(prev => {
      const next = [...prev];
      for (let i = 0; i < chars.length; i++) next[i] = chars[i];
      return next;
    });
    const last = Math.min(chars.length, length) - 1;
    if (last >= 0) {
      const lastInput = inputsRef.current[last];
      if (lastInput) lastInput.focus();
    }
    e.preventDefault();
  };

  const handleFocus = (idx: number) => {
    setFocusedIndex(idx);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const getInputClassName = (idx: number) => {
    const baseClasses = "w-12 h-12 text-center text-lg border rounded-lg focus:outline-none transition-colors duration-200 px-3 py-2 text-gray-800 placeholder-gray-400 shadow-sm";

    if (values[idx] || focusedIndex === idx) {
      return `${baseClasses} ring-2 ring-blue-500 border-transparent`;
    }

    return `${baseClasses} border-gray-300 bg-white hover:border-gray-400`;
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={el => { inputsRef.current[idx] = el }}
          value={values[idx]}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(idx)}
          onBlur={handleBlur}
          maxLength={1}
          inputMode="text"
          className={getInputClassName(idx)}
          disabled={!!(disbled || disabled)}
          aria-label={`otp-${idx}`}
        />
      ))}
    </div>
  );
}

export default OtpInput;