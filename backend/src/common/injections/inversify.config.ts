import IUserUseCases from '@modules/user/domain/use-cases/IUserUseCases';
import { Container } from 'inversify';
import TYPES from './types';
import UserUseCasesImpl from '@modules/user/application/use-cases-impl/UserUseCasesImpl';
import IUserRepository from '@modules/user/infra/interfaces/IUserRepository';
import UserRepositoryImpl from '@modules/user/infra/repositories/UserRepositoryImpl';
import IAuthUseCases from '@modules/user/domain/use-cases/IAuthUseCases';
import AuthUseCasesImpl from '@modules/user/application/use-cases-impl/AuthUseCasesImpl';
import IEmailSender from '@common/interfaces/IEmailSender';
import { NodemailerEmailSender } from '@common/utils/NodemailerEmailSender';

const container = new Container();

container.bind<IUserUseCases>(TYPES.IUserUseCases).to(UserUseCasesImpl).inSingletonScope();
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepositoryImpl).inSingletonScope();
container.bind<IAuthUseCases>(TYPES.IAuthUseCases).to(AuthUseCasesImpl).inSingletonScope();
container.bind<IEmailSender>(TYPES.IEmailSender).to(NodemailerEmailSender).inSingletonScope();

export { container };
