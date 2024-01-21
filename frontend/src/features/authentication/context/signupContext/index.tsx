import { ReactNode, useContext, useState } from 'react';
import ISignupDTO from '@features/authentication/interfaces/ISignupDTO';
import { SignupContext } from './SignupContext';

interface SignupProviderProps {
  children: ReactNode;
}

export const SignupProvider = ({ children }: SignupProviderProps) => {
  const [signupData, setSignupData] = useState<ISignupDTO>({
    mail: '',
    password: '',
    name: '',
  });
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <SignupContext.Provider value={{ signupData, setSignupData, currentStep, setCurrentStep }}>
      {children}
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
