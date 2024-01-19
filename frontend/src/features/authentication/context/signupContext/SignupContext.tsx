import ISignupDTO from '@features/authentication/interfaces/ISignupDTO';
import { createContext } from 'react';

interface SignupContextValues {
  signupData: ISignupDTO;
  setSignupData: React.Dispatch<React.SetStateAction<ISignupDTO>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const SignupContext = createContext<SignupContextValues | null>(null);
