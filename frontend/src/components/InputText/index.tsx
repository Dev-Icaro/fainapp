import { HTMLInputTypeAttribute } from 'react';
import styles from './InputText.module.scss';
import classNames from 'classnames';

interface InputTextProps {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
}

const InputText = ({ id, type, label, placeholder, className }: InputTextProps) => {
  const classes = classNames(styles.inputText, className);

  return (
    <div className={classes}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} />
    </div>
  );
};

export default InputText;
