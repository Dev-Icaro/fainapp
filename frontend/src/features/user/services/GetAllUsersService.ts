import IPaginationParams from 'interfaces/IPaginationParams';
import IService from 'interfaces/IService';
import RepositoryFactory from 'utils/RepositoryFactory';
import IUserDTO from 'domain/user/dtos/IUserDTO';

export default class GetAllUsersService implements IService<IUserDTO[]> {
  public async execute(paginationParams: IPaginationParams): Promise<IUserDTO[]> {
    const userRepo = RepositoryFactory.getUserRepository();
    return userRepo.getAllUsers(paginationParams);
  }
}