import { login } from '@features/authentication/services/login';
import useUserStore from '@features/authentication/useUserStore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useLoginViewModel = () => {
  const methods = useForm();
  const { setAccessToken } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = methods.handleSubmit(async (formData: any) => {
    setIsLoading(true);

    await login({
      mail: formData.mail,
      password: formData.password,
    })
      .then(data => {
        setAccessToken(data.accessToken);
      })
      .catch(error => {
        setError(error?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  return {
    handleLogin,
    isLoading,
    methods,
    error,
  };
};

export default useLoginViewModel;
