import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './SideForm.module.scss';
import stylesTheme from 'styles/Theme.module.scss';

interface SideFormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

const SideForm = ({ onSubmit, children, className }: SideFormProps) => {
  const classes = classNames(styles.sideForm, stylesTheme.shadow, className);

  return (
    <form className={classes} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default SideForm;
