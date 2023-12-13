import { FormEvent, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './SideForm.module.scss';
import stylesTheme from 'styles/Theme.module.scss';

interface SideFormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SideForm = ({ onSubmit, children }: SideFormProps) => {
  const classes = classNames(styles.sideForm, stylesTheme.shadow);

  return (
    <form className={classes} action="" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default SideForm;
