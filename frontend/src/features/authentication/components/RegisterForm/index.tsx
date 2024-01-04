import { ReactComponent as Logo } from 'assets/logo.svg';
import styles from './RegisterForm.module.scss';
import stylesTheme from 'styles/Theme.module.scss';
import InputText from 'presentation/components/InputText';
import Button from 'presentation/components/Button';
import { FormProvider } from 'react-hook-form';
import { inputEmailValidation } from 'utils/inputValidations';
import useRegisterUser from 'presentation/views/auth/RegisterForm/hooks/useRegisterUser';

const RegisterForm = () => {
  const { methods, handleSubmit, apiError } = useRegisterUser();

  return (
    <FormProvider {...methods}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <Logo width={64} height={64} />
        <strong>Bem-vindo! Cadastre sua conta para começarmos</strong>
        {apiError && <div className={stylesTheme.error}>{apiError}</div>}
        <InputText
          id="mail"
          label="Endereço de email"
          type="email"
          placeholder="Insira seu email"
          maxLength={50}
          {...inputEmailValidation}
        />
        <InputText
          id="name"
          label="Nome completo"
          type="text"
          placeholder="Insira seu nome"
          maxLength={50}
          validations={{ required: { value: true, message: 'Nome é obrigatório' } }}
        />
        <InputText
          id="password"
          label="Senha"
          type="password"
          placeholder="Insira sua senha"
          maxLength={50}
          validations={{ required: { value: true, message: 'Senha é obrigatória' } }}
        />
        <InputText
          id="passwordRepeat"
          label="Repita sua senha"
          type="password"
          placeholder="Repita sua senha"
          maxLength={50}
          validations={{ required: { value: true, message: 'Repita senha é obrigatório' } }}
        />
        <Button className={styles.registerForm__registerButton} variant="filled" type="submit">
          Registrar-se
        </Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
