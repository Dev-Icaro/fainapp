import { ReactComponent as Logo } from 'assets/logo.svg';
import styles from './RegisterForm.module.scss';
import InputText from 'components/InputText';
import Button from 'components/Button';
import { useForm, FormProvider } from 'react-hook-form';
import { inputEmailValidation } from 'common/utils/inputValidations';
import api from 'services/api';
import { useState } from 'react';

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const methods = useForm();

  const handleSubmit = methods.handleSubmit(data => {
    const arePasswordsEqual = data.password === data.passwordRepeat;
    if (!arePasswordsEqual) {
      methods.setError('passwordRepeat', {
        type: 'manual',
        message: 'As senhas devem ser iguais',
      });
      return;
    }

    const userData = {
      mail: data.email,
      password: data.password,
      name: data.name,
    };

    api
      .post('user', userData)
      .then(data => console.log(data))
      .catch(err => {
        if err.
        const errorMessage = err.response.data.message;
        setErrorMessage(errorMessage);
      });
  });

  return (
    <FormProvider {...methods}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <Logo width={64} height={64} />
        <strong>Bem-vindo! Cadastre sua conta para começarmos</strong>
        {errorMessage && <div>{errorMessage}</div>}
        <InputText
          id="email"
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
