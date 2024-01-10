import LoginService from '@features/authentication/services/LoginService';
import useAuthStore from '@features/authentication/useAuthStore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  mail: Yup.string().email().required(),
  password: Yup.string().required(),
});

const useLoginViewModel = () => {
  const methods = useForm({
    resetOptions: {
      keepErrors: false,
    },
    resolver: yupResolver(formSchema),
  });
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setAccessToken } = useAuthStore();

  const handleSubmit = methods.handleSubmit(async formData => {
    // setIsLoading(true);

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
      });
    // .finally(() => {
    //   setIsLoading(false);
    // });
  });

  return {
    handleSubmit,
    isLoading: methods.formState.isSubmitting,
    methods,
    error,
    formState: methods.formState,
  };
};

export default useLoginViewModel;
