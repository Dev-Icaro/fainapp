import { InputHTMLAttributes } from 'react';
import styles from './InputText.module.scss';
import classNames from 'classnames';
// import { FieldValues, RegisterOptions } from 'react-hook-form';
// import { findInputError } from '@utils/findInputError';
// import { isInputInvalid } from '@utils/isInputInvalid';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  // validations?: RegisterOptions<FieldValues, string>;
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
  // validations,
  maxLength,
  error,
  ...rest
}: InputTextProps) => {
  // const {
  //   register,
  //   formState: { errors },
  // } = useFormContext();

  // const inputError = findInputError(errors, id);
  // const isInvalid = isInputInvalid(inputError);
  const isValid = !error;

  const classes = classNames(styles.inputText, className, {
    [styles['inputText--error']]: !isValid,
  });

  return (
    <div className={classes}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        // {...register(id, validations)}
        maxLength={maxLength}
        {...rest}
      />
      {error && <InputError message={error} />}
    </div>
  );
};

const InputError = ({ message }: InputErrorProps) => {
  return <div className={styles.inputError}>{message}</div>;
};

export default InputText;
