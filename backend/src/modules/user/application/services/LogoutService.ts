import redisCache from '@common/cache/RedisCache';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';

export default class LogoutService implements IService<void> {
  constructor(private readonly appContext: AppContext) {}

  public async execute(refreshTokenHash: string): Promise<void> {
    await redisCache.getClient().del(refreshTokenHash);
  }
}
