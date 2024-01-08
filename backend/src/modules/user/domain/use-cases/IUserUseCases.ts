import IPaginationParams from '@common/interfaces/IPaginationParams';
import IUserDTO from '../dtos/IUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import IUserPaginationDTO from '../dtos/IUserPaginationDTO';

export default interface IUserUseCases {
  getUserById(userId: number): Promise<IUserDTO>;
  getAllUsers(paginationParams: IPaginationParams): Promise<IUserPaginationDTO>;
  updateUser(updateUserDTO: IUpdateUserDTO): Promise<void>;
  deleteUser(userId: number): Promise<void>;
}
