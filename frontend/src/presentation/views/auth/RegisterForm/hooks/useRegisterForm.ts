import { useForm } from 'react-hook-form';
import useRegisterUser from 'services/auth/useRegisterUser';

const useRegisterForm = () => {
  const methods = useForm();
  const registerUserMutation = useRegisterUser();

  const handleSubmit = methods.handleSubmit(async (data: any) => {
    const arePasswordsEqual = data.password === data.passwordRepeat;
    if (!arePasswordsEqual) {
      methods.setError('passwordRepeat', {
        type: 'manual',
        message: 'As senhas devem ser iguais',
      });
      return;
    }

    await registerUserMutation.mutateAsync({
      mail: data.mail,
      name: data.name,
      password: data.password,
    });
  });

  return {
    handleSubmit,
    methods,
    error: registerUserMutation.error?.message,
    isLoading: registerUserMutation.isLoading,
  };
};

export default useRegisterForm;
