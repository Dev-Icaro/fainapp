import VerifyService from '@features/authentication/services/VerifyService';
import { ChangeEvent, FormEvent, useState } from 'react';
import Notificator from '@utils/Notificator';

const useVerifyViewModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [verificationCode, setVerificationCode] = useState(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await VerifyService.execute(verificationCode)
      .then(() => setApiError(''))
      .catch(error => Notificator.error(error?.message))
      .finally(() => setIsLoading(false));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(parseInt(event.target.value));
  };

  return {
    isLoading,
    apiError,
    handleSubmit,
    handleInputChange,
  };
};

export default useVerifyViewModel;
