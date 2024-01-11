import SignupService from '@features/authentication/services/SignupService';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

type FormData = Yup.InferType<typeof formSchema>;

const formSchema = Yup.object().shape({
  password: Yup.string().min(6).required(),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required(),
  mail: Yup.string().email().required(),
  name: Yup.string().required(),
});

const useSignupViewModel = () => {
  const { formState, handleSubmit, register } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleSignup = handleSubmit(async data => {
    await SignupService.execute({
      mail: data.mail,
      name: data.name,
      password: data.password,
    })
      .then(() => setApiError(''))
      .catch(error => {
        setApiError(error?.message);
      });
  });

  return {
    handleSignup,
    register,
    navigate,
    apiError,
    formErrors: formState.errors,
    isLoading: formState.isSubmitting,
  };
};

export default useSignupViewModel;
