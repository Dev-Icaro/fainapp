import VerifyService from '@features/authentication/services/VerifyService';
import { ChangeEvent, FormEvent, useState } from 'react';
import Notificator from '@utils/Notificator';
import { useSignupContext } from '@features/authentication/context/signupContext';

const useVerifyViewModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState(0);
  const { signupData } = useSignupContext();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await VerifyService.execute(verificationCode)
      .catch(error => Notificator.error(error?.message))
      .finally(() => setIsLoading(false));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(parseInt(event.target.value));
  };

  return {
    isLoading,
    handleSubmit,
    handleInputChange,
    email: signupData?.mail,
  };
};

export default useVerifyViewModel;
