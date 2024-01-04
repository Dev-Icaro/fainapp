import IService from 'interfaces/IService';
import RepositoryFactory from 'utils/RepositoryFactory';
import ISignupDTO from 'domain/user/dtos/ISignupDTO';

export default class SignupService implements IService<void> {
  public async execute(signupDTO: ISignupDTO): Promise<void> {
    const userRepo = RepositoryFactory.getUserRepository();
    return userRepo.signup(signupDTO);
  }
}
