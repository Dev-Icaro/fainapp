import { useForm } from 'react-hook-form';
import useUserStore from 'features/authentication/useUserStore';
import { LoginResult, UserCredentials } from 'features/authentication/services/AuthService';
import { useMutation } from 'react-query';
import api from 'api/api';
import { handleError } from 'utils/errorHandler';

const useLoginForm = () => {
  const methods = useForm();
  const { setAccessToken } = useUserStore();

  const mutation = useMutation<LoginResult, Error, UserCredentials>({
    mutationFn: async (userCredentials: UserCredentials) => {
      return api
        .post<LoginResult>('auth/login', userCredentials)
        .then(response => response.data)
        .catch(err => handleError(err));
    },
  });

  const handleSubmit = methods.handleSubmit(async (formData: any) => {
    const { accessToken } = await mutation.mutateAsync({
      mail: formData.mail,
      password: formData.password,
    });

    accessToken && setAccessToken(accessToken);
  });

  return {
    handleSubmit,
    methods,
    mutation,
  };
};

export default useLoginForm;