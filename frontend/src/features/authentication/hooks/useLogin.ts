import api from '@api/api';
import { useMutation } from 'react-query';
import { handleError } from 'src/utils/errorHandler';

type UserCredentials = {
  mail: string;
  password: string;
};

type LoginResult = {
  accessToken: string;
};

const login = async (userCredentials: UserCredentials): Promise<LoginResult> => {
  return api
    .post<LoginResult>('auth/login', userCredentials)
    .then(response => response.data)
    .catch(err => handleError(err));
};

const useLogin = () => {
  return useMutation<LoginResult, Error, UserCredentials>({
    mutationFn: login,
  });
};

export default useLogin;
