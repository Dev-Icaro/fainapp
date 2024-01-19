import useSignupViewModel from './useSignupViewModel';

const SignupView = () => {
  const { showCurrentStep } = useSignupViewModel();

  return <div>{showCurrentStep()}</div>;
};

export default SignupView;
