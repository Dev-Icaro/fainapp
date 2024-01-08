import ISignupDTO from '../dtos/ISignupDTO';
import IUserCredentials from '../dtos/IUserCredentialsDTO';
import IVerifyUserDTO from '../dtos/IVerifyUserDTO';
import ITokenInfo from '../models/ITokenInfo';

export default interface IAuthUseCases {
  login(authDTO: IUserCredentials): Promise<ITokenInfo>;
  refresh(refreshTokenHash: string): Promise<ITokenInfo>;
  logout(refreshTokenHash: string): Promise<void>;
  signup(signupDTO: ISignupDTO): Promise<void>;
  verify(verifyUserDTO: IVerifyUserDTO): Promise<void>;
}
