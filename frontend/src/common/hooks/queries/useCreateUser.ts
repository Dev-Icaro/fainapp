import { useMutation, MutationOptions } from 'react-query';
import api from 'services/api';

interface ICreateUserParams {
  mail: string;
  password: string;
  name: string;
}

export function useCreateUser((options?: MutationOptions<any, unknown, ICreateUserParams>) => void){
  return useMutation(async (userData: ICreateUserParams) => {
    const response = await api.post('/user', userData);
    return response.data;
  }, mutationOptions);
}
