import { Outlet } from 'react-router-dom';
import styles from './AuthBasePage.module.scss';
import { ReactComponent as AuthBasePageArt } from 'assets/auth-base-page-art.svg';

const AuthBasePage = () => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authContainer__art}>
        <AuthBasePageArt />
      </div>
      <div className={styles.authContainer__authPanel}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthBasePage;
