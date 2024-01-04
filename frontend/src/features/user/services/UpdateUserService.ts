import IService from '@interfaces/IService';
import RepositoryFactory from 'src/utils/RepositoryFactory';
import IUpdateUserDTO from '../data/dtos/IUpdateUserDTO';
import IUserRepository from '../data/repositories/interfaces/IUserRepository';

export default class UpdateUserService implements IService<void> {
  constructor(private readonly userRepo: IUserRepository) {}

  public async execute(updateUserDTO: IUpdateUserDTO): Promise<void> {
    const userRepo = RepositoryFactory.getUserRepository();
    return userRepo.updateUser(updateUserDTO);
  }
}
