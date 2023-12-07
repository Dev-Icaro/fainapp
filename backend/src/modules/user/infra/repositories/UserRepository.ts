import { PoolClient } from 'pg';
import IUserRepository from '../interfaces/IUserRepository';
import ICreateUserDTO from '@modules/user/domain/dtos/ICreateUserDTO';
import IUser from '@modules/user/domain/models/IUser';
import Helpers from '@common/utils/Helpers';
import IPaginationParams from '@common/interfaces/IPaginationParams';
import IUpdateUserDTO from '@modules/user/domain/dtos/IUpdateUserDTO';

export default class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly client: PoolClient) {}

  async existsById(userId: string): Promise<boolean> {
    const result = await this.client.query(
      `
      SELECT EXISTS(
        SELECT 1 FROM users 
        WHERE user_id = $1
      )
      `,
      [userId],
    );
    return result.rows[0].exists;
  }

  async getUserByMail(mail: string): Promise<IUser> {
    const result = await this.client.query(
      `
      SELECT * FROM users
      WHERE mail = $1
      `,
      [mail],
    );

    if (result.rows[0]) {
      const user = result.rows[0];
      return {
        userId: user.user_id,
        mail: user.mail,
        name: user.name,
        password: user.password,
        creationDate: user.creation_date,
        updateDate: user.update_date,
      };
    } else {
      return null;
    }
  }

  async existsByMail(mail: string): Promise<boolean> {
    const result = await this.client.query(
      `
      SELECT EXISTS(
        SELECT 1 FROM users 
        WHERE mail = $1
      )
      `,
      [mail],
    );
    return result.rows[0].exists;
  }

  async countUsers(): Promise<number> {
    const result = await this.client.query(
      `
      SELECT COUNT(*) AS TOTAL_COUNT FROM users
      `,
    );
    return parseInt(result.rows[0].total_count);
  }

  async createUser(user: ICreateUserDTO): Promise<void> {
    await this.client.query(
      `
      INSERT INTO users (
        mail,
        password,
        name,
        creation_date,
      ) VALUES (
        $1, $2, $3, $4
      )
      `,
      [user.mail, user.password, user.name, new Date()],
    );
  }

  async getById(userId: number): Promise<IUser> {
    const result = await this.client.query(
      `
      SELECT * FROM users
      WHERE user_id = $1
      `,
      [userId],
    );

    if (result.rows[0]) {
      const user = result.rows[0];
      return {
        userId: user.user_id,
        mail: user.mail,
        name: user.name,
        password: user.password,
        creationDate: user.creation_date,
        updateDate: user.update_date,
      };
    } else {
      return null;
    }
  }

  async getAllUsers(paginationParams: IPaginationParams): Promise<IUser[]> {
    const orderByClauses = Helpers.generateOrderByClauses(paginationParams.orderBy);
    const result = await this.client.query(
      `
      SELECT * FROM users
      ${orderByClauses.length > 0 ? orderByClauses.join(',') : ''}
      LIMIT $1 OFFSTE $2
      `,
      [paginationParams.perPage, paginationParams.page * paginationParams.perPage],
    );

    if (result.rows.length > 0) {
      const users: IUser[] = [];
      result.rows.forEach(user => {
        users.push({
          userId: user.user_id,
          mail: user.mail,
          name: user.name,
          password: user.password,
          creationDate: user.creation_date,
          updateDate: user.update_date,
        });
      });
      return users;
    } else {
      return null;
    }
  }

  async updateUser(user: IUpdateUserDTO): Promise<void> {
    await this.client.query(
      `UPDATE users SET 
        mail = $1,
        password = $2,
        name = $3,
        update_date = $4
      WHERE 
        user_id = $5
      `,
      [user.mail, user.password, user.name, new Date(), user.userId],
    );
  }

  async deleteUser(userId: number): Promise<void> {
    await this.client.query(
      `
      DELETE FROM users WHERE id = $1
      `,
      [userId],
    );
  }
}
