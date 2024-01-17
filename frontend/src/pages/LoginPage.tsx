import { AuthPageLayout, LoginView } from '@features/authentication';

const LoginPage = () => {
  return (
    <AuthPageLayout title="Login">
      <LoginView />
    </AuthPageLayout>
  );
};

export default LoginPage;
