import api from '@api/api';
import IPaginationParams from '@interfaces/IPaginationParams';
import ISignupDTO from '../dtos/ISignupDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import IUserDTO from '../dtos/IUserDTO';
import IUserRepository from './interfaces/IUserRepository';
import { injectable } from 'inversify';

@injectable()
export default class UserRepositoryImpl implements IUserRepository {
  getUserById(userId: number): Promise<IUserDTO> {
    return api.get<IUserDTO>(`user/${userId}`).then(response => response.data);
  }

  getAllUsers(paginationParams: IPaginationParams): Promise<IUserDTO[]> {
    return api
      .get<IUserDTO[]>('user', { params: paginationParams })
      .then(response => response.data);
  }

  updateUser(updateUserDTO: IUpdateUserDTO): Promise<void> {
    return api.put('user', updateUserDTO);
  }

  deleteUser(userId: number): Promise<void> {
    return api.delete(`user/${userId}`);
  }

  signup(signupDTO: ISignupDTO): Promise<void> {
    return api.post('user', signupDTO);
  }
}
