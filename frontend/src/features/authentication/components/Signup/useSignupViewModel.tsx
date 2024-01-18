import { yupResolver } from '@hookform/resolvers/yup';
import { InputErrorMessages } from '@utils/systemConstants';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import SignupService from '@features/authentication/services/SignupService';
import Helpers from '@utils/Helpers';
import Notificator from '@utils/Notificator';

type FormData = Yup.InferType<typeof formSchema>;

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required(InputErrorMessages.REQUIRED)
    .min(6, Helpers.formatErrorMessage(InputErrorMessages.MIN_LENGTH, [6])),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'As senhas devem ser iguais')
    .required(InputErrorMessages.REQUIRED),
  mail: Yup.string().email(InputErrorMessages.INVALID_EMAIL).required(InputErrorMessages.REQUIRED),
  name: Yup.string().required(InputErrorMessages.REQUIRED),
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
        Notificator.error(error?.message);
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
