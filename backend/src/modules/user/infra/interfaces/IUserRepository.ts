import IPaginationParams from '@common/interfaces/IPaginationParams';
import ICreateUserDTO from '@modules/user/domain/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/user/domain/dtos/IUpdateUserDTO';
import IUser from '@modules/user/domain/models/IUser';

export default interface IUserRepository {
  getById(userId: number): Promise<IUser>;
  getUserByMail(mail: string): Promise<IUser>;
  getAllUsers(paginationParams: IPaginationParams): Promise<IUser[]>;
  createUser(user: ICreateUserDTO): Promise<void>;
  updateUser(user: IUpdateUserDTO): Promise<void>;
  deleteUser(userId: number): Promise<void>;
  countUsers(): Promise<number>;
  existsByMail(mail: string): Promise<boolean>;
  existsById(userId: string): Promise<boolean>;
}
