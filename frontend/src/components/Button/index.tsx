import classNames from 'classnames';
import styles from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';

type ButtonVariants = 'filled' | 'outlined';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const Button = ({ className, children, variant, ...props }: ButtonProps) => {
  const classes = classNames(styles.button, className, {
    [styles.button__filled]: variant === 'filled',
    [styles.button__outlined]: variant === 'outlined',
  });
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
