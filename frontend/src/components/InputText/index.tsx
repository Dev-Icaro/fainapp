import { InputHTMLAttributes } from 'react';
import styles from './InputText.module.scss';
import classNames from 'classnames';
import React from 'react';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface InputErrorProps {
  message: string;
}

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ id, label, className, error, ...props }: InputTextProps, ref) => {
    const classes = classNames(styles.inputText, className, {
      [styles['inputText--error']]: !!error,
    });

    return (
      <div className={classes}>
        <label htmlFor={id}>{label}</label>
        <input ref={ref} {...props} />
        {error && <InputError message={error} />}
      </div>
    );
  },
);

const InputError = ({ message }: InputErrorProps) => {
  return <div className={styles.inputError}>{message}</div>;
};

export default InputText;
