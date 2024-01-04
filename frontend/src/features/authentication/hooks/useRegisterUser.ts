import api from '@api/api';
import ICreateUserDTO from '@features/user/data/dtos/ICreateUserDTO';
import { useMutation } from 'react-query';
import { handleError } from 'src/utils/errorHandler';

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
