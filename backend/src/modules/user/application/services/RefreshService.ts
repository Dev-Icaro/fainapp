import IService from '@common/interfaces/IService';
import ITokenInfo from '@modules/user/domain/models/ITokenInfo';
import redisCache from '@common/cache/RedisCache';
import AppException from '@common/exceptions/AppException';
import { AuthErrorMessages } from '@modules/user/domain/error-messages/AuthErrorMessages';
import { HttpStatus } from '@common/utils/systemConstants';
import IUserRepository from '@modules/user/infra/interfaces/IUserRepository';
import RepositoryFactory from '@common/utils/RepositoryFactory';
import AppContext from '@common/utils/AppContext';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';
import {
  createAccessToken,
  createHashForRefreshToken,
  createRefreshToken,
} from '../utils/authUtils';

export default class RefreshService implements IService<ITokenInfo> {
  constructor(private readonly appContext: AppContext) {}

  public async execute(refreshTokenHash: string): Promise<ITokenInfo> {
    const userMail = await redisCache.getClient().get(refreshTokenHash);
    if (!userMail) {
      throw new AppException(AuthErrorMessages.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }

    const userRepo: IUserRepository = RepositoryFactory.getUserRepository();
    const user = await userRepo.getUserByMail(this.appContext.getClient(), userMail);
    if (!user) {
      throw new AppException(UserErrorMessages.USERS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user.mail);
    const newRefreshTokenHash = createHashForRefreshToken(refreshToken);

    await redisCache.getClient().set(newRefreshTokenHash, user.mail, 'EX', 8 * 60 * 60);
    await redisCache.getClient().del(refreshToken);

    return { accessToken, refreshToken };
  }
}
