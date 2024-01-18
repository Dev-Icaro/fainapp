import { Link } from 'react-router-dom';
import styles from './LoginView.module.scss';
import stylesTheme from '@styles/Theme.module.scss';
import useLoginViewModel from './useLoginViewModel';
import InputText from '@components/InputText';
import Button from '@components/Button';
import Loading from '@components/Loading';

const LoginView = () => {
  const { handleLogin, register, formErrors, isLoading, navigate } = useLoginViewModel();

  return isLoading ? (
    <Loading />
  ) : (
    <form className={styles.loginForm} onSubmit={handleLogin}>
      <InputText
        id="mail"
        label="Endereço de email"
        type="email"
        placeholder="Insira seu email"
        maxLength={50}
        error={formErrors.mail?.message}
        {...register('mail')}
      />

      <InputText
        id="password"
        label="Senha"
        type="password"
        placeholder="Insira sua senha"
        maxLength={50}
        error={formErrors.password?.message}
        {...register('password')}
      />

      <Link className={stylesTheme.link} to={'/forgot-password'}>
        Esqueceu sua senha?
      </Link>
      <Button type="submit" variant="filled">
        Logar
      </Button>
      <Button type="submit" variant="outlined" onClick={() => navigate('/auth/register')}>
        Registrar-se
      </Button>
    </form>
  );
};

export default LoginView;
