import ICreateUserDTO from 'domain/user/dtos/ICreateUserDTO';
import { useMutation } from 'react-query';
import api from 'api/api';
import { handleError } from 'utils/errorHandler';

const registerUser = async (createUserDTO: ICreateUserDTO): Promise<void> => {
  return api
    .post('/user', createUserDTO)
    .then(response => response.data)
    .catch(err => handleError(err));
};

const useRegisterUser = () => {
  return useMutation<void, Error, ICreateUserDTO>({
    mutationFn: registerUser,
  });
};

export default useRegisterUser;
