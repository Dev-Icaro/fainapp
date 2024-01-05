import { signup } from '@features/authentication/services/SignupService';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useSignupViewModel = () => {
  const methods = useForm();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = methods.handleSubmit(async (data: any) => {
    setIsLoading(true);
    try {
      const arePasswordsEqual = data.password === data.passwordRepeat;
      if (!arePasswordsEqual) {
        methods.setError('passwordRepeat', {
          type: 'manual',
          message: 'As senhas devem ser iguais',
        });
        return;
      }

      await signup({
        mail: data.mail,
        name: data.name,
        password: data.password,
      }).catch(error => setError(error?.message));
    } finally {
      setIsLoading(false);
    }
  });

  return {
    handleSignup,
    methods,
    error,
    isLoading,
  };
};

export default useSignupViewModel;
