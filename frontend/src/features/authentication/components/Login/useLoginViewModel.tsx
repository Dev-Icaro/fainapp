import LoginService from '@features/authentication/services/LoginService';
import useAuthStore from '@features/authentication/useAuthStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { InputErrorMessages } from '@utils/systemConstants';
import Notificator from '@utils/Notificator';

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
  const { setAccessToken } = useAuthStore();

  const handleLogin = handleSubmit(async formData => {
    await LoginService.execute({
      mail: formData.mail,
      password: formData.password,
    })
      .then(data => {
        setAccessToken(data.accessToken);
      })
      .catch(error => {
        Notificator.error(error?.message);
      });
  });

  return {
    handleLogin,
    navigate,
    register,
    isLoading: formState.isSubmitting,
    formErrors: formState.errors,
  };
};

export default useLoginViewModel;
