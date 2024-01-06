import { ILoginResult } from '../interfaces/ILoginResult';
import { IUserCredentials } from '../interfaces/IUserCredentials';
import RepositoryFactory from '@utils/RepositoryFactory';

const LoginService = {
  execute: async (userCredentials: IUserCredentials): Promise<ILoginResult> => {
    const authRepo = RepositoryFactory.getAuthRepository();
    return authRepo.login(userCredentials);
  },
};

export default LoginService;
