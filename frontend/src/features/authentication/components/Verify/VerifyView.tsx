import Loading from '@components/Loading';
import useVerifyViewModel from './useVerifyViewModel';
import InputText from '@components/InputText';

const VerifyView = () => {
  const { apiError, handleSubmit, isLoading } = useVerifyViewModel();

  return isLoading ? (
    <Loading />
  ) : (
    <form action="" onSubmit={handleSubmit}>
      {apiError && <div>{apiError}</div>}
      <InputText
        id="verificationCode"
        label="Codigo de verificação"
        placeholder="Digite o código de verificação"
        maxLength={4}
        type="text"
      />
    </form>
  );
};

export default VerifyView;
