import IUserRepository from 'data/repositories/interfaces/IUserRepository';
import { Container } from 'inversify';
import TYPES from './types';
import UserRepositoryImpl from 'data/repositories/UserRepositoryImpl';

const container = new Container();

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepositoryImpl).inSingletonScope();

export default container;
