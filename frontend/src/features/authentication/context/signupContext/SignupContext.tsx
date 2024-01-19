import ISignupDTO from '@features/authentication/interfaces/ISignupDTO';
import { createContext } from 'react';

interface SignupContextValues {
  signupData: ISignupDTO | null;
  setSignupData: (signupData: ISignupDTO) => void;
}

export const SignupContext = createContext<SignupContextValues | null>(null);
