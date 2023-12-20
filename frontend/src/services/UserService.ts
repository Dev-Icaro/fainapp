import HttpResponse from 'common/interfaces/HttpResponse';
import api from './api';
import axios from 'axios';
import ApiException from 'common/exceptions/ApiException';

interface RegisterUserParams {
  mail: string;
  password: string;
  name: string;
}

interface UserCredentials {
  mail: string;
  password: string;
}

export default class UserService {
  public static async signup(
    registerUserParams: RegisterUserParams,
  ): Promise<HttpResponse | undefined> {
    try {
      const response = await api.post('user', registerUserParams);
      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage = err.response.data.message;
        const statusCode = err.response.status;
        throw new ApiException(errorMessage, statusCode);
      }
    }
  }

  public static async login(userCredentials: UserCredentials): Promise<HttpResponse | undefined> {
    try {
      const response = await api.post('auth/login', userCredentials);
      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage = err.response.data.message;
        const statusCode = err.response.status;
        throw new ApiException(errorMessage, statusCode);
      }
    }
  }
}
