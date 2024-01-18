import { AuthPageLayout, VerifyView } from '@features/authentication';

const VerifyPage = () => {
  return (
    <AuthPageLayout title="Verificação de email">
      <VerifyView />
    </AuthPageLayout>
  );
};

export default VerifyPage;
