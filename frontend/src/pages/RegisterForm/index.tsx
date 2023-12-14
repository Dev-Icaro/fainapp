import { ReactComponent as Logo } from 'assets/logo.svg';
import styles from './RegisterForm.module.scss';
import InputText from 'components/InputText';
import Button from 'components/Button';

const RegisterForm = () => {
  return (
    <form className={styles.registerForm}>
      <Logo width={64} height={64} />
      <strong>Bem-vindo! Cadastre sua conta para começarmos</strong>
      <InputText id="email" label="Endereço de email" type="email" placeholder="Insira seu email" />
      <InputText id="name" label="Nome completo" type="text" placeholder="Insira seu nome" />
      <InputText id="password" label="Senha" type="password" placeholder="Insira sua senha" />
      <InputText
        id="password-repeat"
        label="Repita sua senha"
        type="password"
        placeholder="Repita sua senha"
      />
      <Button className={styles.registerForm__registerButton} variant="filled" type="submit">
        Registrar-se
      </Button>
    </form>
  );
};

export default RegisterForm;
