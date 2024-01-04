import IService from '@interfaces/IService';
import RepositoryFactory from 'src/utils/RepositoryFactory';
import ISignupDTO from '../data/dtos/ISignupDTO';

export default class SignupService implements IService<void> {
  public async execute(signupDTO: ISignupDTO): Promise<void> {
    const userRepo = RepositoryFactory.getUserRepository();
    return userRepo.signup(signupDTO);
  }
}
