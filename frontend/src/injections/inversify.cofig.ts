import { Container } from 'inversify';
import TYPES from './types';
import UserRepositoryImpl from '@features/user/data/repositories/UserRepositoryImpl';
import IUserRepository from '@features/user/data/repositories/interfaces/IUserRepository';
import IAuthRepository from '@features/authentication/data/repositories/interfaces/IAuthRepository';
import AuthRepositoryImpl from '@features/authentication/data/repositories/AuthRepositoryImpl';

const container = new Container();

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepositoryImpl).inSingletonScope();
container.bind<IAuthRepository>(TYPES.IAuthRepository).to(AuthRepositoryImpl).inSingletonScope();

export default container;
