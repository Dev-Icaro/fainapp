import { useMutation } from 'react-query';
import api from 'services/api';
import { handleError } from 'services/utils/errorHandler';

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
