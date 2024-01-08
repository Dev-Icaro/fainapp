import ServiceExecutor from '@common/utils/ServiceExecutor';
import IUserCredentialsDTO from '@modules/user/domain/dtos/IUserCredentialsDTO';
import ITokenInfo from '@modules/user/domain/models/ITokenInfo';
import IAuthUseCases from '@modules/user/domain/use-cases/IAuthUseCases';
import LoginService from '../services/LoginService';
import { injectable } from 'inversify';
import RefreshService from '../services/RefreshService';
import LogoutService from '../services/LogoutService';
import ISignupDTO from '@modules/user/domain/dtos/ISignupDTO';
import SignupService from '../services/SignupService';
import IVerifyUserDTO from '@modules/user/domain/dtos/IVerifyUserDTO';
import VerifyUserService from '../services/VerifyUserService';

@injectable()
export default class AuthUseCasesImpl implements IAuthUseCases {
  verify(verifyUserDTO: IVerifyUserDTO): Promise<void> {
    return ServiceExecutor.execute<void>(VerifyUserService, verifyUserDTO);
  }

  signup(signupDTO: ISignupDTO): Promise<void> {
    return ServiceExecutor.execute<void>(SignupService, signupDTO);
  }

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
