import ISignupDTO from '@features/user/data/dtos/ISignupDTO';
import RepositoryFactory from '@utils/RepositoryFactory';

export default class SignupService {
  public static async execute(signupDTO: ISignupDTO): Promise<void> {
    const authRepo = RepositoryFactory.getAuthRepository();
    return authRepo.signup(signupDTO);
  }
}
