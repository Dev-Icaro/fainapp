import { ChangeEvent, InputHTMLAttributes, useRef, useState, KeyboardEvent } from 'react';
import styles from './InputDigit.module.scss';

const InputDigit = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trim();
    setInputValue(newValue);

    if (newValue) {
      focusNextInput();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !event.currentTarget.value) {
      focusPreviousInput();
    }
  };

  const focusNextInput = () => {
    const nextInput = ref.current?.nextSibling;
    if (nextInput instanceof HTMLInputElement && nextInput.className.includes(styles.inputDigit)) {
      nextInput?.focus();
    }
  };

  const focusPreviousInput = () => {
    const prevInput = ref.current?.previousSibling;
    if (prevInput instanceof HTMLInputElement && prevInput.className.includes(styles.inputDigit)) {
      prevInput?.focus();
    }
  };

  return (
    <input
      className={styles.inputDigit}
      {...props}
      maxLength={1}
      ref={ref}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={inputValue}
    />
  );
};

export default InputDigit;
