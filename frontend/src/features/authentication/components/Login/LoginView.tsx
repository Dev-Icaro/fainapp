import { Link } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import { FormProvider } from 'react-hook-form';
import stylesTheme from '@styles/Theme.module.scss';
import { inputEmailValidation } from 'src/utils/inputValidations';
import useLoginViewModel from './useLoginViewModel';
import { ReactComponent as Logo } from '@assets/logo.svg';
import InputText from '@components/InputText';
import Button from '@components/Button';

const LoginView = () => {
  const { handleLogin, methods, error, isLoading } = useLoginViewModel();

  if (isLoading) {
    return <div>Carregando ...</div>;
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <Logo width={64} height={64} />
        <strong>Bem-vindo de volta! Logue-se na sua conta.</strong>
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
