import api from '../../../api/api';
import { handleError } from '../../../utils/errorHandler';
// import { ServiceResult } from './types/ServiceResult';
// import { errorHandler } from './utils/errorHandler';

export type UserCredentials = {
  mail: string;
  password: string;
};

export type LoginResult = {
  accessToken: string;
};

export default class AuthService {
  public static async login(userCredentials: UserCredentials): Promise<LoginResult | undefined> {
    try {
      const response = await api.post('auth/login', userCredentials);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}
