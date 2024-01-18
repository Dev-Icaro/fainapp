import { ChangeEvent, InputHTMLAttributes, useRef } from 'react';
import styles from './VerificationCodeInput.module.scss';
import React from 'react';

const Character = React.forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return <input className={styles.character} {...props} maxLength={1} ref={ref} />;
  },
);

const VerificationCodeInput = () => {
  const charRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInputChange = (index: number, value: string) => {
    if (value) {
      if (index < charRefs.length - 1) {
        charRefs[index + 1].current?.focus();
      }
    } else {
      if (index > 0) {
        charRefs[index - 1].current?.focus();
      }
    }
  };

  return (
    <div className={styles.verificationCodeInput}>
      {charRefs.map((ref, index) => (
        <Character
          key={index}
          ref={ref}
          type="text"
          // onChange={(e: ChangeEvent<HTMLInputElement>) => }
          onKeyDown={e => handleInputChange(index, e.target.value)}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
