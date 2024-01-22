import SignupStep1 from './steps/SignupStep1/SignupStep1';
import SignupStep2 from './steps/SignupStep2/SignupStep2';
import { useSignupContext } from '@features/authentication/context/signupContext';
import VerifyView from './steps/SignupStep3/SignupStep3';

const useSignupViewModel = () => {
  const { currentStep } = useSignupContext();

  const showCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SignupStep1 />;
      case 2:
        return <SignupStep2 />;
      case 3:
        return <VerifyView />;
    }
  };

  return {
    showCurrentStep,
    currentStep,
  };
};

export default useSignupViewModel;
