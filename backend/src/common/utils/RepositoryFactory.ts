import { container } from '@common/injections/inversify.config';
import TYPES from '@common/injections/types';
import IUserRepository from '@modules/user/infra/interfaces/IUserRepository';

class RepositoryFactory {
  public getUserRepository(): IUserRepository {
    return container.get<IUserRepository>(TYPES.IUserRepository);
  }
}

export default new RepositoryFactory();
