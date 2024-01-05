import container from '@injections/inversify.cofig';
import TYPES from '@injections/types';
import IUserRepository from '@features/user/data/repositories/interfaces/IUserRepository';
import IAuthRepository from '@features/authentication/data/repositories/interfaces/IAuthRepository';

export default class RepositoryFactory {
  static getUserRepository(): IUserRepository {
    return container.get<IUserRepository>(TYPES.IUserRepository);
  }

  static getAuthRepository(): IAuthRepository {
    return container.get<IAuthRepository>(TYPES.IAuthRepository);
  }
}
