import IService from 'interfaces/IService';
import RepositoryFactory from 'utils/RepositoryFactory';

export default class DeleteUserService implements IService<void> {
  public async execute(userId: number): Promise<void> {
    const userRepo = RepositoryFactory.getUserRepository();
    return userRepo.deleteUser(userId);
  }
}
