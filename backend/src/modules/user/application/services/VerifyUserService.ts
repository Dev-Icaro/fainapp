import redisCache from '@common/cache/RedisCache';
import AppException from '@common/exceptions/AppException';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import RepositoryFactory from '@common/utils/RepositoryFactory';
import { HttpStatus } from '@common/utils/systemConstants';
import IVerifyUserDTO from '@modules/user/domain/dtos/IVerifyUserDTO';
import { AuthErrorMessages } from '@modules/user/domain/error-messages/AuthErrorMessages';

export default class VerifyUserService implements IService<void> {
  constructor(private readonly appContext: AppContext) {}

  public async execute(verifyUserDTO: IVerifyUserDTO): Promise<void> {
    const userRepo = RepositoryFactory.getUserRepository();
    const userVerificationCode = Number(await redisCache.getClient().get(verifyUserDTO.mail));

    if (userVerificationCode !== verifyUserDTO.verificationCode) {
      throw new AppException(AuthErrorMessages.INVALID_VERIFICATION_CODE, HttpStatus.UNAUTHORIZED);
    }

    return userRepo.verifyUser(this.appContext.getClient(), verifyUserDTO.mail);
  }
}
