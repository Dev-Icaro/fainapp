import { AuthPageLayout, SignupView } from '@features/authentication';

const SignupPage = () => {
  return (
    <AuthPageLayout title="Cadastre-se">
      <SignupView />
    </AuthPageLayout>
  );
};

export default SignupPage;
