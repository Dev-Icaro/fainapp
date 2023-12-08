import IAuthDTO from '../dtos/IUserCredentialsDTO';
import ITokenInfo from '../models/ITokenInfo';

export default interface IAuthUseCases {
  login(authDTO: IAuthDTO): Promise<ITokenInfo>;
  refresh(refreshTokenHash: string): Promise<ITokenInfo>;
  logout(refreshTokenHash: string): Promise<void>;
}
