import VerifyService from '@features/authentication/services/VerifyService';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  verificationCode: number;
}

const useVerifyViewModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const methods = useForm<FormData>();

  const handleSubmit = methods.handleSubmit(async data => {
    setIsLoading(true);
    await VerifyService.execute(data.verificationCode)
      .then(() => setError(''))
      .catch(error => setError(error?.message))
      .finally(() => setIsLoading(false));
  });

  return {
    methods,
    isLoading,
    error,
    handleSubmit,
  };
};

export default useVerifyViewModel;
