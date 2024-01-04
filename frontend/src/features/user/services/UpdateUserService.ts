import IService from 'interfaces/IService';
import RepositoryFactory from 'utils/RepositoryFactory';
import IUserRepository from 'data/repositories/interfaces/IUserRepository';
import IUpdateUserDTO from 'domain/user/dtos/IUpdateUserDTO';

export default class UpdateUserService implements IService<void> {
  constructor(private readonly userRepo: IUserRepository) {}

  public async execute(updateUserDTO: IUpdateUserDTO): Promise<void> {
    const userRepo = RepositoryFactory.getUserRepository();
    return userRepo.updateUser(updateUserDTO);
  }
}
