import { ILoginResult } from '@features/authentication/interfaces/ILoginResult';
import { IUserCredentials } from '@features/authentication/interfaces/IUserCredentials';
import ISignupDTO from '@features/user/data/dtos/ISignupDTO';
import IAuthRepository from './interfaces/IAuthRepository';
import api from '@api/api';
import { handleError } from '@utils/errorHandler';
import { injectable } from 'inversify';

@injectable()
export default class AuthRepositoryImpl implements IAuthRepository {
  async login(userCredentials: IUserCredentials): Promise<ILoginResult> {
    return api
      .post<ILoginResult>('auth/login', userCredentials)
      .then(response => response.data)
      .catch(error => handleError(error));
  }

  async signup(signupDTO: ISignupDTO): Promise<void> {
    return api
      .post('auth/signup', signupDTO)
      .then(response => response.data)
      .catch(error => handleError(error));
  }

  async verify(verificationCode: number): Promise<void> {
    return api
      .post('auth/verify', verificationCode)
      .then(response => response.data)
      .catch(error => handleError(error));
  }
}
