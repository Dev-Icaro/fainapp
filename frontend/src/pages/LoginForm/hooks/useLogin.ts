import ApiException from 'common/exceptions/ApiException';
import useUserStore from 'store/useUserStore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import UserService from 'services/UserService';

const useLogin = () => {
  const methods = useForm();
  const [apiError, setApiError] = useState('');
  const { setAccessToken } = useUserStore();

  const handleSubmit = methods.handleSubmit(async (data: any) => {
    try {
      const accessToken = await UserService.login({
        mail: data.mail,
        password: data.password,
      });

      if (!accessToken) {
        throw new Error('Falha na autenticação');
      }

      setAccessToken(accessToken);
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
