import Button from 'components/Button';
import InputText from 'components/InputText';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import { ReactComponent as Logo } from 'assets/logo.svg';

const LoginForm = () => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <Logo width={64} height={64} />
      <strong>Bem-vindo de volta! Logue-se na sua conta.</strong>
      <InputText id="email" label="Endereço de email" type="email" placeholder="Insira seu email" />
      <InputText id="pass" label="Senha" type="password" placeholder="Insira sua senha" />
      <Link className={styles.loginForm__forgotPassword} to={'/forgot-password'}>
        Esqueceu sua senha?
      </Link>
      <Button type="submit" text="Logar" variant="filled" />
      <p>OU</p>
      <Button type="submit" text="Registrar-se" variant="outlined" />
    </form>
  );
};

export default LoginForm;
