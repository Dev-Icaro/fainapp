import { ILoginResult } from '../interfaces/ILoginResult';
import { IUserCredentials } from '../interfaces/IUserCredentials';
import RepositoryFactory from '@utils/RepositoryFactory';

export default class LoginService {
  public static async execute(userCredentials: IUserCredentials): Promise<ILoginResult> {
    const authRepo = RepositoryFactory.getAuthRepository();
    return authRepo.login(userCredentials);
  }
}
