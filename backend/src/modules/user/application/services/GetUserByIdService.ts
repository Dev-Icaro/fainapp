import AppException from '@common/exceptions/AppException';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import Helpers from '@common/utils/Helpers';
import RepositoryFactory from '@common/utils/RepositoryFactory';
import { HttpStatus } from '@common/utils/systemConstants';
import IUserDTO from '@modules/user/domain/dtos/IUserDTO';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';

export default class GetUserByIdService implements IService<IUserDTO> {
  constructor(private readonly appContext: AppContext) {}

  public async execute(userId: number): Promise<IUserDTO> {
    const userRepo = RepositoryFactory.getUserRepository();
    const user = await userRepo.getUserById(this.appContext.getClient(), userId);
    if (user) {
      return {
        userId: user.userId,
        mail: user.mail,
        name: user.name,
      };
    } else {
      throw new AppException(
        Helpers.formatErrorMessage(UserErrorMessages.USER_NOT_FOUND_BY_ID, [userId]),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
