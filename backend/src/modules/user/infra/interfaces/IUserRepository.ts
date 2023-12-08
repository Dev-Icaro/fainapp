import IPaginationParams from '@common/interfaces/IPaginationParams';
import ICreateUserDTO from '@modules/user/domain/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/user/domain/dtos/IUpdateUserDTO';
import IUser from '@modules/user/domain/models/IUser';
import { PoolClient } from 'pg';

export default interface IUserRepository {
  getById(client: PoolClient, userId: number): Promise<IUser>;
  getUserByMail(client: PoolClient, mail: string): Promise<IUser>;
  getAllUsers(client: PoolClient, paginationParams: IPaginationParams): Promise<IUser[]>;
  createUser(client: PoolClient, user: ICreateUserDTO): Promise<void>;
  updateUser(client: PoolClient, user: IUpdateUserDTO): Promise<void>;
  deleteUser(client: PoolClient, userId: number): Promise<void>;
  countUsers(client: PoolClient): Promise<number>;
  existsByMail(client: PoolClient, mail: string): Promise<boolean>;
  existsById(client: PoolClient, userId: number): Promise<boolean>;
}
