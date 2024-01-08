import { AuthPageLayout, SignupView } from '@features/authentication';

const SignupPage = () => {
  return (
    <AuthPageLayout message="Bem-vindo! Cadastre sua conta para começarmos">
      <SignupView />
    </AuthPageLayout>
  );
};

export default SignupPage;
