import InputText from 'components/InputText';
import SideForm from 'components/SideForm';

const LoginPage = () => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  return (
    <>
      <SideForm onSubmit={handleSubmit}>
        <InputText
          id="email"
          label="Endereço de email"
          type="text"
          placeholder="Insira seu email"
        />
        <InputText id="pass" label="Senha" type="password" placeholder="Insira sua senha" />
        <button type="submit">teste</button>
      </SideForm>
    </>
  );
};

export default LoginPage;
