import Loading from '@components/Loading';
import InputDigit from '../../../InputDigit';
import useSignupStep3 from './useSignupStep3';
import styles from './SignupStep3.module.scss';
import stylesTheme from '@styles/Theme.module.scss';
import Button from '@components/Button';

const VerifyView = () => {
  const {
    handleSubmit,
    isLoading,
    email,
    handleInputChange,
    handleButtonDisabled,
    VERIFICATION_CODE_INPUT_COUNT,
  } = useSignupStep3();

  return isLoading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <form action="" onSubmit={handleSubmit} className={styles.verifyForm}>
        <p>
          Por favor, digite o código que enviamos para o email: <strong>{email}</strong>
        </p>
        <div className={styles.verifyForm__verificationCode}>
          {Array.from({ length: VERIFICATION_CODE_INPUT_COUNT }).map((valueIgnored, index) => (
            <InputDigit key={index} onChange={e => handleInputChange(e, index)} />
          ))}
        </div>
        <div className={styles.verifyForm__resendEmail}>
          <p>Não recebeu o email?</p>
          <a className={stylesTheme.link}>Reenviar</a>
        </div>
        <Button variant="filled" disabled={handleButtonDisabled()}>
          Verificar
        </Button>
      </form>
    </div>
  );
};

export default VerifyView;
