import api from '@api/api';
import ISignupDTO from '@features/user/data/dtos/ISignupDTO';
import { handleError } from '@utils/errorHandler';

export const signup = (signupDTO: ISignupDTO): Promise<void> => {
  return api
    .post('user/signup', signupDTO)
    .then(response => response.data)
    .catch(error => handleError(error));
};
