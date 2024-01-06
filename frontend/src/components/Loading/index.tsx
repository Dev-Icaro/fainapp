import styles from './Loading.module.scss';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <FaSpinner className={styles.loading__spin} size={50} />
      Carregando...
    </div>
  );
};

export default Loading;
