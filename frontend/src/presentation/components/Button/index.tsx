import classNames from 'classnames';
import styles from './Button.module.scss';
import { ReactNode } from 'react';

type ButtonVariants = 'filled' | 'outlined';

interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  variant?: ButtonVariants;
  children?: ReactNode;
  className?: string;
}

const Button = ({ children, type, variant, className }: ButtonProps) => {
  const classes = classNames(styles.button, className, {
    [styles.button__filled]: variant === 'filled',
    [styles.button__outlined]: variant === 'outlined',
  });

  return (
    <button className={classes} type={type}>
      {children}
    </button>
  );
};

export default Button;
