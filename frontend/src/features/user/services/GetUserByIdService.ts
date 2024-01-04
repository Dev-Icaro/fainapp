import IService from '@interfaces/IService';
import RepositoryFactory from 'src/utils/RepositoryFactory';
import IUserDTO from '../data/dtos/IUserDTO';

export default class GetUserByIdService implements IService<IUserDTO> {
  public async execute(userId: number): Promise<IUserDTO> {
    const userRepo = RepositoryFactory.getUserRepository();
    return userRepo.getUserById(userId);
  }
}
