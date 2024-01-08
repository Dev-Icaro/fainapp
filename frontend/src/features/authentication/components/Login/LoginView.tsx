import { Link } from 'react-router-dom';
import styles from './LoginView.module.scss';
import { FormProvider } from 'react-hook-form';
import stylesTheme from '@styles/Theme.module.scss';
import { inputEmailValidation } from '@utils/inputValidations';
import useLoginViewModel from './useLoginViewModel';
import InputText from '@components/InputText';
import Button from '@components/Button';
import Loading from '@components/Loading';

const LoginView = () => {
  const { handleSubmit, methods, error, isLoading } = useLoginViewModel();

  return isLoading ? (
    <Loading />
  ) : (
    <FormProvider {...methods}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        {error && <div className={stylesTheme.error}>{error}</div>}
        <InputText
          id="mail"
          label="Endereço de email"
          type="email"
          placeholder="Insira seu email"
          maxLength={50}
          {...inputEmailValidation}
        />
        <InputText
          id="password"
          label="Senha"
          type="password"
          placeholder="Insira sua senha"
          maxLength={50}
          validations={{ required: { value: true, message: 'Senha é obrigatória' } }}
        />
        <Link className={styles.loginForm__forgotPassword} to={'/forgot-password'}>
          Esqueceu sua senha?
        </Link>
        <Button type="submit" variant="filled">
          Logar
        </Button>
        <p>OU</p>
        <Link className={styles.loginForm__registerButton} to={'/auth/register'}>
          <Button type="submit" variant="outlined">
            Registar-se
          </Button>
        </Link>
      </form>
    </FormProvider>
  );
};

export default LoginView;
