import Loading from '@components/Loading';
import useVerifyViewModel from './useVerifyViewModel';
import { FormProvider } from 'react-hook-form';
import InputText from '@components/InputText';

const VerifyView = () => {
  const { error, handleSubmit, isLoading, methods } = useVerifyViewModel();

  return isLoading ? (
    <Loading />
  ) : (
    <FormProvider {...methods}>
      <form action="" onSubmit={handleSubmit}>
        <InputText
          id="verificationCode"
          label="Codigo de verificação"
          placeholder="Digite o código de verificação"
          maxLength={4}
          type="text"
        />
      </form>
    </FormProvider>
  );
};

export default VerifyView;
