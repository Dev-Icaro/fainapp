import AppException from '@common/exceptions/AppException';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import Helpers from '@common/utils/Helpers';
import RepositoryFactory from '@common/utils/RepositoryFactory';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';

export default class DeleteUserService implements IService<void> {
  constructor(private readonly appContext: AppContext) {}

  public async execute(userId: number): Promise<void> {
    const userRepo = RepositoryFactory.getUserRepository();
    const existsById = await userRepo.existsById(this.appContext.getClient(), userId);
    if (!existsById) {
      throw new AppException(
        Helpers.formatErrorMessage(UserErrorMessages.USER_NOT_FOUND, [userId]),
      );
    }
    return userRepo.deleteUser(this.appContext.getClient(), userId);
  }
}
