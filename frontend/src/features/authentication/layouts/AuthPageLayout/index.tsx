import styles from './AuthPageLayout.module.scss';
import { ReactComponent as AuthPageArt } from '@assets/auth-page-art.svg';
import { ReactComponent as Logo } from '@assets/logo.svg';
import { ReactNode } from 'react';

interface AuthPageLayoutProps {
  children: ReactNode;
  title: string;
}

const AuthPageLayout = ({ children, title }: AuthPageLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <span className={styles.panel__side}>
          <header>
            <Logo width={64} height={64} />
            <p className={styles.panel__title}>{title}</p>
          </header>
          <div>{children}</div>
        </span>
        <span className={styles.panel__side}>
          <AuthPageArt width={350} height={350} />
        </span>
      </div>
    </div>
  );
};

export default AuthPageLayout;
