import LoginService from '@features/authentication/services/LoginService';
import useAuthStore from '@features/authentication/useAuthStore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useLoginViewModel = () => {
  const methods = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setAccessToken } = useAuthStore();

  const handleSubmit = methods.handleSubmit(async (formData: any) => {
    setIsLoading(true);
    setTimeout(async () => {
      await LoginService.execute({
        mail: formData.mail,
        password: formData.password,
      })
        .then(data => {
          setAccessToken(data.accessToken);
          setError('');
        })
        .catch(error => {
          setError(error?.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 300);
  });

  return {
    handleSubmit,
    isLoading,
    methods,
    error,
  };
};

export default useLoginViewModel;
