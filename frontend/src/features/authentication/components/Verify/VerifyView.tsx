import Loading from '@components/Loading';
import InputDigit from '../InputDigit';
import useVerifyViewModel from './useVerifyViewModel';
import styles from './VerifyView.module.scss';
import stylesTheme from '@styles/Theme.module.scss';
import Button from '@components/Button';

const VerifyView = () => {
  const { handleSubmit, isLoading } = useVerifyViewModel();

  return isLoading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <form action="" onSubmit={handleSubmit} className={styles.verifyForm}>
        <p>
          Por favor, digite o código que enviamos para o email:{' '}
          <strong>icarokiilermelo@gmail.com</strong>
        </p>
        <div className={styles.verifyForm__verificationCode}>
          <InputDigit />
          <InputDigit />
          <InputDigit />
          <InputDigit />
          <InputDigit />
        </div>
        <div className={styles.verifyForm__resendEmail}>
          <p>Não recebeu o email?</p>
          <a className={stylesTheme.link}>Reenviar</a>
        </div>
        <Button variant="filled">Verificar</Button>
      </form>
    </div>
  );
};

export default VerifyView;
