import { Container } from 'inversify';
import TYPES from './types';
import UserRepositoryImpl from '@features/user/data/repositories/UserRepositoryImpl';
import IUserRepository from '@features/user/data/repositories/interfaces/IUserRepository';

const container = new Container();

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepositoryImpl).inSingletonScope();

export default container;
