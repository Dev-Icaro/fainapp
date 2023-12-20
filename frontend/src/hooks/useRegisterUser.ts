import ApiException from 'common/exceptions/ApiException';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import UserService from 'services/UserService';

const useRegisterUser = () => {
  const methods = useForm();
  const [apiError, setApiError] = useState('');

  const handleSubmit = methods.handleSubmit(async (data: any) => {
    const arePasswordsEqual = data.password === data.passwordRepeat;
    if (!arePasswordsEqual) {
      methods.setError('passwordRepeat', {
        type: 'manual',
        message: 'As senhas devem ser iguais',
      });
      return;
    }

    try {
      await UserService.signup({
        mail: data.mail,
        name: data.name,
        password: data.password,
      });
      setApiError('');
    } catch (err) {
      if (err instanceof ApiException) {
        setApiError(err.message);
      }
    }
  });

  return {
    handleSubmit,
    methods,
    apiError,
  };
};

export default useRegisterUser;
