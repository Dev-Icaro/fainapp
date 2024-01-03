import IPaginationParams from '@common/interfaces/IPaginationParams';
import IUserDTO from '../dtos/IUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import IUserPaginationDTO from '../dtos/IUserPaginationDTO';
import ISignupDTO from '../dtos/ISignupDTO';

export default interface IUserUseCases {
  getUserById(userId: number): Promise<IUserDTO>;
  getAllUsers(paginationParams: IPaginationParams): Promise<IUserPaginationDTO>;
  signup(signupDTO: ISignupDTO): Promise<void>;
  updateUser(updateUserDTO: IUpdateUserDTO): Promise<void>;
  deleteUser(userId: number): Promise<void>;
}
