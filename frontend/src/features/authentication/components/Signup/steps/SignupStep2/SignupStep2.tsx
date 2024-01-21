import Button from '@components/Button';
import InputText from '@components/InputText';
import styles from '../../SignupView.module.scss';
import useSignupStep2 from './useSignupStep2';
import Loading from '@components/Loading';

const SignupStep2 = () => {
  const { register, formErrors, handleCancel, handleSubmitData, isLoading } = useSignupStep2();

  return isLoading ? (
    <Loading />
  ) : (
    <form className={styles.signupStep} onSubmit={handleSubmitData}>
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
      <div className={styles.signupStep__buttonWrapper}>
        <Button variant="filled" type="submit">
          Registrar-se
        </Button>
        <Button variant="outlined" type="button" onClick={handleCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default SignupStep2;
