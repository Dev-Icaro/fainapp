import VerifyService from '@features/authentication/services/VerifyService';
import { FormEvent, useState } from 'react';

const useVerifyViewModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [verificationCode, setVerificationCode] = useState(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await VerifyService.execute(verificationCode)
      .then(() => setApiError(''))
      .catch(error => setApiError(error?.message))
      .finally(() => setIsLoading(false));
  };

  const handleInputChange = (event: ) {
    
  }

  return {
    isLoading,
    apiError,
    handleSubmit,
  };
};

export default useVerifyViewModel;
