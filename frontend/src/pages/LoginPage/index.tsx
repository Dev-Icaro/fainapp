import Button from 'components/Button';
import InputText from 'components/InputText';
import SideForm from 'components/SideForm';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { ReactComponent as LoginArt } from 'assets/login-art.svg';

const LoginPage = () => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContainer__art}>
        <LoginArt />
      </div>
      <SideForm className={styles.loginContainer__loginForm} onSubmit={handleSubmit}>
        <Logo width={64} />
        <strong>Bem-vindo de volta! Logue-se na sua conta.</strong>
        <InputText
          id="email"
          label="Endereço de email"
          type="email"
          placeholder="Insira seu email"
        />
        <InputText id="pass" label="Senha" type="password" placeholder="Insira sua senha" />
        <Link className={styles.loginContainer__forgotPassword} to={'/forgot-password'}>
          Esqueceu sua senha?
        </Link>
        <Button type="submit" text="Logar" variant="filled" />
        <p>OU</p>
        <Button type="submit" text="Registrar-se" variant="outlined" />
      </SideForm>
    </div>
  );
};

export default LoginPage;
