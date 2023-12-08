import { Redis as RedisClient } from 'ioredis';

class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new RedisClient();
  }

  public getClient(): RedisClient {
    return this.client;
  }
}

export default new RedisCache();
