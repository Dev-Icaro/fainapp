import ApiException from 'common/exceptions/ApiException';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import UserService from 'services/UserService';

const useLogin = () => {
  const methods = useForm();
  const [apiError, setApiError] = useState('');

  const handleSubmit = methods.handleSubmit(async (data: any) => {
    try {
      UserService.login({
        mail: data.mail,
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

export default useLogin;
