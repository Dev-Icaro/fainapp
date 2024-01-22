import classNames from 'classnames';
import styles from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';

type ButtonVariants = 'filled' | 'outlined';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const Button = ({ className, children, variant, ...props }: ButtonProps) => {
  const classes = classNames(styles.button, className, {
    [styles['button--filled']]: variant === 'filled',
    [styles['button--outlined']]: variant === 'outlined',
    [styles['button--filled--disabled']]: variant === 'filled' && props.disabled === true,
    [styles['button--outlined--disabled']]: variant === 'outlined' && props.disabled === true,
  });
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
