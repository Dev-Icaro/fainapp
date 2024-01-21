import { useNavigate } from 'react-router-dom';
import SignupStep1 from './steps/SignupStep1/SignupStep1';
import SignupStep2 from './steps/SignupStep2/SignupStep2';
import { useSignupContext } from '@features/authentication/context/signupContext';
import VerifyView from '../Verify/VerifyView';

const useSignupViewModel = () => {
  const navigate = useNavigate();
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
    navigate,
    showCurrentStep,
    currentStep,
  };
};

export default useSignupViewModel;
