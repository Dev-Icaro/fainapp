import IService from 'interfaces/IService';
import RepositoryFactory from 'utils/RepositoryFactory';
import IUserDTO from 'domain/user/dtos/IUserDTO';

export default class GetUserByIdService implements IService<IUserDTO> {
  public async execute(userId: number): Promise<IUserDTO> {
    const userRepo = RepositoryFactory.getUserRepository();
    return userRepo.getUserById(userId);
  }
}
