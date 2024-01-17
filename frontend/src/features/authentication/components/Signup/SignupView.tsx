import styles from './RegisterForm.module.scss';
import stylesTheme from '@styles/Theme.module.scss';
import Button from '@components/Button';
import InputText from '@components/InputText';
import useSignupViewModel from './useSignupViewModel';
import Loading from '@components/Loading';

const SignupView = () => {
  const { handleSignup, apiError, formErrors, isLoading, register, navigate } =
    useSignupViewModel();

  return isLoading ? (
    <Loading />
  ) : (
    <form className={styles.registerForm} onSubmit={handleSignup}>
      {apiError && <div className={stylesTheme.error}>{apiError}</div>}
      <div className={styles.registerForm__inputWrapper}>
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
          id="name"
          label="Nome completo"
          type="text"
          placeholder="Insira seu nome"
          maxLength={50}
          error={formErrors.name?.message}
          {...register('name')}
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
        <InputText
          id="passwordRepeat"
          label="Repita sua senha"
          type="password"
          placeholder="Repita sua senha"
          maxLength={50}
          error={formErrors.passwordRepeat?.message}
          {...register('passwordRepeat')}
        />
      </div>
      <div className={styles.registerForm__buttonWrapper}>
        <Button className={styles.registerForm__registerButton} variant="filled" type="submit">
          Registrar-se
        </Button>
        <Button
          className={styles.registerForm__registerButton}
          variant="outlined"
          type="button"
          onClick={() => navigate('/auth/login')}
        >
          Logar-se
        </Button>
      </div>
    </form>
  );
};

export default SignupView;
