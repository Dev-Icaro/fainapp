import { AuthPageLayout, LoginView } from '@features/authentication';

const LoginPage = () => {
  return (
    <AuthPageLayout message="Bem-vindo de volta! Logue-se na sua conta.">
      <LoginView />
    </AuthPageLayout>
  );
};

export default LoginPage;
