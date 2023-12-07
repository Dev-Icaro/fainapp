import { PoolClient } from 'pg';
import database from '@config/database';

export default class AppContext {
  private client: PoolClient = null;
  private isInTransaction: boolean = false;

  public async createConnection() {
    if (!this.client) {
      this.client = await database.connect();
    }
  }

  public getClient() {
    return this.client;
  }

  public async beginTransaction() {
    if (!this.isInTransaction) {
      await this.createConnection();
      this.isInTransaction = true;
      await this.client.query('BEGIN');
    }
  }

  public release() {
    if (this.client) {
      this.client.release();
    }
  }

  public async commit() {
    if (this.isInTransaction) {
      await this.client.query('COMMIT');
      this.isInTransaction = false;
    }
  }

  public async rollback() {
    if (this.isInTransaction) {
      await this.client.query('ROLLBACK');
      this.isInTransaction = false;
    }
  }
}
