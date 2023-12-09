import AppException from '@common/exceptions/AppException';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import Helpers from '@common/utils/Helpers';
import RepositoryFactory from '@common/utils/RepositoryFactory';
import { HttpStatus } from '@common/utils/systemConstants';
import IUserCredentialsDTO from '@modules/user/domain/dtos/IUserCredentialsDTO';
import { AuthErrorMessages } from '@modules/user/domain/error-messages/AuthErrorMessages';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';
import ITokenInfo from '@modules/user/domain/models/ITokenInfo';
import IUserRepository from '@modules/user/infra/interfaces/IUserRepository';
import bcrypt from 'bcrypt';
import {
  createAccessToken,
  createHashForRefreshToken,
  createRefreshToken,
} from '../utils/authUtils';
import redisCache from '@common/cache/RedisCache';

export default class LoginService implements IService<ITokenInfo> {
  constructor(private readonly appContext: AppContext) {}

  public async execute(userCredentialsDTO: IUserCredentialsDTO): Promise<ITokenInfo> {
    const userRepo: IUserRepository = RepositoryFactory.getUserRepository();

    const user = await userRepo.getUserByMail(this.appContext.getClient(), userCredentialsDTO.mail);
    if (!user) {
      throw new AppException(
        Helpers.formatErrorMessage(UserErrorMessages.USER_NOT_FOUND_BY_ID, [
          userCredentialsDTO.mail,
        ]),
        HttpStatus.NOT_FOUND,
      );
    }

    if (!bcrypt.compareSync(userCredentialsDTO.password, user.password)) {
      throw new AppException(AuthErrorMessages.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user.mail);
    const refreshTokenHash = createHashForRefreshToken(refreshToken);

    await redisCache.getClient().set(refreshTokenHash, user.mail, 'EX', 8 * 60 * 60);

    return { accessToken, refreshToken };
  }
}
