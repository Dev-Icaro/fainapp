import ApiException from 'common/exceptions/ApiException';
import useUserStore from 'common/hooks/useUserStore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import UserService from 'services/UserService';

const useLogin = () => {
  const methods = useForm();
  const [apiError, setApiError] = useState('');

  const handleSubmit = methods.handleSubmit(async (data: any) => {
    const setAccessToken = useUserStore(state => state.setAccessToken);

    try {
      const response = await UserService.login({
        mail: data.mail,
        password: data.password,
      });

      setAccessToken(response?.data?.accessToken);
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
