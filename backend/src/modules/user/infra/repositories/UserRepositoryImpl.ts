import { PoolClient } from 'pg';
import IUserRepository from '../interfaces/IUserRepository';
import ICreateUserDTO from '@modules/user/domain/dtos/ICreateUserDTO';
import IUser from '@modules/user/domain/models/IUser';
import Helpers from '@common/utils/Helpers';
import IPaginationParams from '@common/interfaces/IPaginationParams';
import IUpdateUserDTO from '@modules/user/domain/dtos/IUpdateUserDTO';
import { injectable } from 'inversify';

@injectable()
export default class UserRepositoryImpl implements IUserRepository {
  async existsById(client: PoolClient, userId: number): Promise<boolean> {
    const result = await client.query(
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

  async getUserByMail(client: PoolClient, mail: string): Promise<IUser> {
    const result = await client.query(
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

  async existsByMail(client: PoolClient, mail: string): Promise<boolean> {
    const result = await client.query(
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

  async countUsers(client: PoolClient): Promise<number> {
    const result = await client.query(
      `
      SELECT COUNT(*) AS TOTAL_COUNT FROM users
      `,
    );
    return parseInt(result.rows[0].total_count);
  }

  async createUser(client: PoolClient, user: ICreateUserDTO): Promise<void> {
    await client.query(
      `
      INSERT INTO users (
        mail,
        password,
        name,
        creation_date
      ) VALUES (
        $1, $2, $3, $4
      )
      `,
      [user.mail, user.password, user.name, new Date()],
    );
  }

  async getUserById(client: PoolClient, userId: number): Promise<IUser> {
    const result = await client.query(
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

  async getAllUsers(client: PoolClient, paginationParams: IPaginationParams): Promise<IUser[]> {
    const orderByClauses = Helpers.generateOrderByClauses(paginationParams.orderBy);
    const result = await client.query(
      `
      SELECT * FROM users
      ${orderByClauses.length > 0 ? `ORDER BY ${orderByClauses.join(',')}` : ''}
      LIMIT $1 OFFSET $2
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

  async updateUser(client: PoolClient, user: IUpdateUserDTO): Promise<void> {
    await client.query(
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

  async deleteUser(client: PoolClient, userId: number): Promise<void> {
    await client.query(
      `
      DELETE FROM users WHERE user_id = $1
      `,
      [userId],
    );
  }
}
