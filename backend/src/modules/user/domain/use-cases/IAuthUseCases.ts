import IUserCredentials from '../dtos/IUserCredentialsDTO';
import ITokenInfo from '../models/ITokenInfo';

export default interface IAuthUseCases {
  login(authDTO: IUserCredentials): Promise<ITokenInfo>;
  refresh(refreshTokenHash: string): Promise<ITokenInfo>;
  logout(refreshTokenHash: string): Promise<void>;
}
