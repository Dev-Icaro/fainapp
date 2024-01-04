import container from 'injections/inversify.cofig';
import TYPES from 'injections/types';
import IUserRepository from 'data/repositories/interfaces/IUserRepository';

export default class RepositoryFactory {
  static getUserRepository(): IUserRepository {
    return container.get<IUserRepository>(TYPES.IUserRepository);
  }
}
