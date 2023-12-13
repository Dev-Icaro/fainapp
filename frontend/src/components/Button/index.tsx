import classNames from 'classnames';
import styles from './Button.module.scss';

type ButtonVariants = 'filled' | 'outlined';

interface ButtonProps {
  text: string;
  type: 'submit' | 'reset' | 'button' | undefined;
  variant?: ButtonVariants;
}

const Button = ({ text, type, variant }: ButtonProps) => {
  const classes = classNames(styles.button, {
    [styles.button__filled]: variant === 'filled',
    [styles.button__outlined]: variant === 'outlined',
  });

  return (
    <button className={classes} type={type}>
      {text}
    </button>
  );
};

export default Button;
