import ServiceExecutor from '@common/utils/ServiceExecutor';
import IUserCredentialsDTO from '@modules/user/domain/dtos/IUserCredentialsDTO';
import ITokenInfo from '@modules/user/domain/models/ITokenInfo';
import IAuthUseCases from '@modules/user/domain/use-cases/IAuthUseCases';
import LoginService from '../services/LoginService';
import { injectable } from 'inversify';
import RefreshService from '../services/RefreshService';
import LogoutService from '../services/LogoutService';

@injectable()
export default class AuthUseCasesImpl implements IAuthUseCases {
  login(userCredentialsDTO: IUserCredentialsDTO): Promise<ITokenInfo> {
    return ServiceExecutor.execute<ITokenInfo>(LoginService, userCredentialsDTO);
  }

  refresh(refreshTokenHash: string): Promise<ITokenInfo> {
    return ServiceExecutor.execute<ITokenInfo>(RefreshService, refreshTokenHash);
  }

  logout(refreshTokenHash: string): Promise<void> {
    return ServiceExecutor.execute<void>(LogoutService, refreshTokenHash);
  }
}
