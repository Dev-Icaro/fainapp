import { HTMLInputTypeAttribute } from 'react';
import styles from './InputText.module.scss';

interface InputTextProps {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
}

const InputText = ({ id, type, label, placeholder }: InputTextProps) => {
  return (
    <div className={styles.inputText}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} />
    </div>
  );
};

export default InputText;
