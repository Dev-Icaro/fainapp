import { useSignupContext } from '@features/authentication/context/signupContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputErrorMessages } from '@utils/systemConstants';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

type FormData = Yup.InferType<typeof formSchema>;

const formSchema = Yup.object().shape({
  mail: Yup.string().email(InputErrorMessages.INVALID_EMAIL).required(InputErrorMessages.REQUIRED),
  name: Yup.string().required(InputErrorMessages.REQUIRED),
});

const useSignupStep1 = () => {
  const { setSignupData, setStep } = useSignupContext();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const handleSubmitData = handleSubmit(data => {
    setSignupData(signupData => ({ ...signupData, mail: data.mail, name: data.name }));
    setStep(2);
  });

  const handleCancel = () => {
    navigate(-1);
  };

  return {
    handleSubmitData,
    handleCancel,
    register,
    formErrors: errors,
  };
};

export default useSignupStep1;
