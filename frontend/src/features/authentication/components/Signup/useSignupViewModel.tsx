import SignupService from '@features/authentication/services/SignupService';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useSignupViewModel = () => {
  const methods = useForm();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = methods.handleSubmit(async (data: any) => {
    const arePasswordsEqual = data.password === data.passwordRepeat;
    if (!arePasswordsEqual) {
      methods.setError('passwordRepeat', {
        type: 'manual',
        message: 'As senhas devem ser iguais',
      });
      return;
    }

    setIsLoading(true);
    await SignupService.execute({
      mail: data.mail,
      name: data.name,
      password: data.password,
    })
      .then(() => setError(''))
      .catch(error => {
        setError(error?.message);
      })
      .finally(() => setIsLoading(false));
  });

  return {
    handleSignup,
    methods,
    error,
    isLoading,
  };
};

export default useSignupViewModel;
