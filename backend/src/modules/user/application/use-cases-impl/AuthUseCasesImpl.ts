import IAuthDTO from '@modules/user/domain/dtos/IUserCredentialsDTO';
import ITokenInfo from '@modules/user/domain/models/ITokenInfo';
import IAuthUseCases from '@modules/user/domain/use-cases/IAuthUseCases';

export default class AuthUseCasesImpl implements IAuthUseCases {
  login(authDTO: IAuthDTO): Promise<ITokenInfo> {
    throw new Error('Method not implemented.');
  }

  refresh(refreshTokenHash: string): Promise<ITokenInfo> {
    throw new Error('Method not implemented.');
  }

  logout(refreshTokenHash: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
