import LoginService from '@features/authentication/services/LoginService';
import useAuthStore from '@features/authentication/useAuthStore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { InputErrorMessages } from '@utils/systemConstants';

type FormData = Yup.InferType<typeof formSchema>;

const formSchema = Yup.object().shape({
  mail: Yup.string().email(InputErrorMessages.INVALID_EMAIL).required(InputErrorMessages.REQUIRED),
  password: Yup.string().required(InputErrorMessages.REQUIRED),
});

const useLoginViewModel = () => {
  const { register, formState, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const { setAccessToken } = useAuthStore();

  const handleLogin = handleSubmit(async formData => {
    await LoginService.execute({
      mail: formData.mail,
      password: formData.password,
    })
      .then(data => {
        setAccessToken(data.accessToken);
        setApiError('');
      })
      .catch(error => {
        setApiError(error?.message);
      });
  });

  return {
    handleLogin,
    navigate,
    register,
    apiError,
    isLoading: formState.isSubmitting,
    formErrors: formState.errors,
  };
};

export default useLoginViewModel;
