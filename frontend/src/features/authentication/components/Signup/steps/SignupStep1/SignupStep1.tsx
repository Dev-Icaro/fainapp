import Button from '@components/Button';
import InputText from '@components/InputText';
import styles from '../../SignupView.module.scss';
import useSignupStep1 from './useSignupStep1';

const SignupStep1 = () => {
  const { handleSubmitData, formErrors, register, handleCancel } = useSignupStep1();

  return (
    <form onSubmit={handleSubmitData} className={styles.signupStep}>
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
      <div className={styles.signupStep__buttonWrapper}>
        <Button variant="filled" type="submit">
          Próximo
        </Button>
        <Button variant="outlined" type="button" onClick={handleCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default SignupStep1;
