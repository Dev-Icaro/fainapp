import VerifyService from '@features/authentication/services/VerifyService';
import { ChangeEvent, FormEvent, useState } from 'react';
import Notificator from '@utils/Notificator';
import { useSignupContext } from '@features/authentication/context/signupContext';

const useSignupStep3 = () => {
  const VERIFICATION_CODE_INPUT_COUNT = 5;
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState(
    Array.from({ length: VERIFICATION_CODE_INPUT_COUNT }),
  );
  const { signupData } = useSignupContext();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await VerifyService.execute(parseInt(verificationCode.join('')))
      .catch(error => Notificator.error(error?.message))
      .finally(() => setIsLoading(false));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, digitPosition: number) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[digitPosition] = event.target.value.trim();
    setVerificationCode(newVerificationCode);
  };

  const handleButtonDisabled = () => {
    return verificationCode.some(value => !value);
  };

  return {
    isLoading,
    handleSubmit,
    handleInputChange,
    handleButtonDisabled,
    VERIFICATION_CODE_INPUT_COUNT,
    email: signupData?.mail,
  };
};

export default useSignupStep3;
