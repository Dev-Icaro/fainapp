import IPaginationParams from '@interfaces/IPaginationParams';
import ISignupDTO from '../../dtos/ISignupDTO';
import IUpdateUserDTO from '../../dtos/IUpdateUserDTO';
import IUserDTO from '../../dtos/IUserDTO';

export default interface IUserRepository {
  getUserById(userId: number): Promise<IUserDTO>;
  getAllUsers(paginationParams: IPaginationParams): Promise<IUserDTO[]>;
  updateUser(updateUserDTO: IUpdateUserDTO): Promise<void>;
  deleteUser(userId: number): Promise<void>;
  signup(signupDTO: ISignupDTO): Promise<void>;
}
