import { ILoginResult } from '@features/authentication/interfaces/ILoginResult';
import { IUserCredentials } from '@features/authentication/interfaces/IUserCredentials';
import ISignupDTO from '@features/user/data/dtos/ISignupDTO';

export default interface IAuthRepository {
  login(userCredentials: IUserCredentials): Promise<ILoginResult>;
  signup(signupDTO: ISignupDTO): Promise<void>;
}
