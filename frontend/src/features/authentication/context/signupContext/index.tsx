import { useContext, useState } from 'react';
import ISignupDTO from '@features/authentication/interfaces/ISignupDTO';
import { SignupContext } from './SignupContext';
import { Outlet } from 'react-router-dom';

export const SignupProvider = () => {
  const [signupData, setSignupData] = useState<ISignupDTO>({
    mail: '',
    password: '',
    name: '',
  });
  const [step, setStep] = useState(1);

  return (
    <SignupContext.Provider value={{ signupData, setSignupData, setStep, step }}>
      <Outlet />
    </SignupContext.Provider>
  );
};

export const useSignupContext = () => {
  const signupContext = useContext(SignupContext);
  if (!signupContext) {
    throw new Error('useSignupContext must be used within a DataProvider');
  }
  return signupContext;
};
