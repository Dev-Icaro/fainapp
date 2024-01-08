import styles from './RegisterForm.module.scss';
import stylesTheme from '@styles/Theme.module.scss';
import { FormProvider } from 'react-hook-form';
import Button from '@components/Button';
import InputText from '@components/InputText';
import { inputEmailValidation } from '@utils/inputValidations';
import useSignupViewModel from './useSignupViewModel';
import Loading from '@components/Loading';

const SignupView = () => {
  const { methods, handleSignup, error, isLoading } = useSignupViewModel();

  return isLoading ? (
    <Loading />
  ) : (
    <FormProvider {...methods}>
      <form className={styles.registerForm} onSubmit={handleSignup}>
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

export default SignupView;
