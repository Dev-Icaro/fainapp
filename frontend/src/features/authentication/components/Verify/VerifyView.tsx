import Loading from '@components/Loading';
import VerificationCodeInput from '../VerificationCodeInput';
import useVerifyViewModel from './useVerifyViewModel';

const VerifyView = () => {
  const { apiError, handleSubmit, isLoading } = useVerifyViewModel();

  return isLoading ? (
    <Loading />
  ) : (
    <form action="" onSubmit={handleSubmit}>
      {apiError && <div>{apiError}</div>}
      <VerificationCodeInput />
    </form>
  );
};

export default VerifyView;
