import { useSignupContext } from '@features/authentication/context/signupContext';
import { SignupService } from '@features/authentication/services';
import { yupResolver } from '@hookform/resolvers/yup';
import Helpers from '@utils/Helpers';
import Notificator from '@utils/Notificator';
import { InputErrorMessages } from '@utils/systemConstants';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

type FormData = Yup.InferType<typeof formSchema>;

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required(InputErrorMessages.REQUIRED)
    .min(6, Helpers.formatErrorMessage(InputErrorMessages.MIN_LENGTH, [6])),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'As senhas devem ser iguais')
    .required(InputErrorMessages.REQUIRED),
});

const useSignupStep2 = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });
  const { setSignupData, setStep, signupData } = useSignupContext();
  const navigate = useNavigate();

  const handleSubmitData = handleSubmit(async data => {
    setSignupData(signupData => ({ ...signupData, password: data.password }));

    await SignupService.execute(signupData)
      .then(() => {
        setSignupData(signupData);
        setStep(3);
      })
      .catch(error => {
        Notificator.error(error?.message);
      });
  });

  const handleCancel = () => {
    navigate(-1);
  };

  return {
    register,
    handleSubmitData,
    handleCancel,
    formErrors: errors,
    isLoading: isSubmitting,
  };
};

export default useSignupStep2;
