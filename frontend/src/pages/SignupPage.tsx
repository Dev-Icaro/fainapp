import { AuthPageLayout, SignupView } from '@features/authentication';
import { SignupProvider } from '@features/authentication/context/signupContext';

const SignupPage = () => {
  return (
    <SignupProvider>
      <AuthPageLayout title="Cadastre-se">
        <SignupView />
      </AuthPageLayout>
    </SignupProvider>
  );
};

export default SignupPage;
