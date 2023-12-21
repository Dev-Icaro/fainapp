import api from './api';
import axios from 'axios';
import ApiException from 'common/exceptions/ApiException';

interface RegisterUserParams {
  mail: string;
  password: string;
  name: string;
}

export default class UserService {
  public static async signup(registerUserParams: RegisterUserParams): Promise<void> {
    try {
      await api.post('user', registerUserParams);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage = err.response.data.message;
        const statusCode = err.response.status;
        throw new ApiException(errorMessage, statusCode);
      }
    }
  }
}
