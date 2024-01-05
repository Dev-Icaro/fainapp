import api from '@api/api';
import { handleError } from '@utils/errorHandler';
import { ILoginResult } from '../interfaces/ILoginResult';
import { IUserCredentials } from '../interfaces/IUserCredentials';

export const login = (userCredentials: IUserCredentials): Promise<ILoginResult> => {
  return api
    .post<ILoginResult>('auth/login', userCredentials)
    .then(response => response.data)
    .catch(err => handleError(err));
};
