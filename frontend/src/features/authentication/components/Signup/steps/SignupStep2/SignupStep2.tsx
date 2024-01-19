import Button from '@components/Button';
import InputText from '@components/InputText';
import styles from './SignupStep2.module.scss';
import useSignupStep2 from './useSignupStep2';

const SignupStep2 = () => {
  const { register, formErrors, handleCancel, handleSubmitData } = useSignupStep2();

  return (
    <form className={styles.signupStep2} onSubmit={handleSubmitData}>
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
      <Button variant="filled" type="submit">
        Registrar-se
      </Button>
      <Button variant="outlined" type="button" onClick={handleCancel}>
        Cancelar
      </Button>
    </form>
  );
};

export default SignupStep2;
