import styles from './AuthPageLayout.module.scss';
import { ReactComponent as AuthBasePageArt } from '@assets/auth-base-page-art.svg';
import { ReactComponent as Logo } from '@assets/logo.svg';
import { ReactNode } from 'react';

interface AuthPageLayoutProps {
  children: ReactNode;
  message: string;
}

const AuthPageLayout = ({ children, message }: AuthPageLayoutProps) => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authContainer__art}>
        <AuthBasePageArt />
      </div>
      <div className={styles.authContainer__panel}>
        <header className={styles.authContainer__panel__header}>
          <Logo width={64} height={64} />
          <strong>{message}</strong>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AuthPageLayout;
