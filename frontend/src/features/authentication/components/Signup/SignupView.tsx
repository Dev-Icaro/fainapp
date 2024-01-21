import Stepper from '@components/Stepper';
import useSignupViewModel from './useSignupViewModel';
import styles from './SignupView.module.scss';

const SignupView = () => {
  const { showCurrentStep, currentStep } = useSignupViewModel();

  return (
    <div className={styles.signupView}>
      <div className={styles.signupView__stepper}>
        <Stepper numbersOfStep={3} currentStep={currentStep - 1} />
      </div>
      {showCurrentStep()}
    </div>
  );
};

export default SignupView;
