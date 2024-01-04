import { HTMLInputTypeAttribute } from 'react';
import styles from './InputText.module.scss';
import classNames from 'classnames';
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import { findInputError } from '@utils/findInputError';
import { isInputInvalid } from '@utils/isInputInvalid';

interface InputTextProps {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  validations?: RegisterOptions<FieldValues, string>;
  maxLength?: number;
}

interface InputErrorProps {
  message: string;
}

const InputText = ({
  id,
  type,
  label,
  placeholder,
  className,
  validations,
  maxLength,
}: InputTextProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, id);
  const isInvalid = isInputInvalid(inputError);

  const classes = classNames(styles.inputText, className, {
    [styles['inputText--error']]: isInvalid,
  });

  return (
    <div className={classes}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, validations)}
        maxLength={maxLength}
      />
      {isInvalid && <InputError message={inputError.error.message} />}
    </div>
  );
};

const InputError = ({ message }: InputErrorProps) => {
  return <div className={styles.inputError}>{message}</div>;
};

export default InputText;
