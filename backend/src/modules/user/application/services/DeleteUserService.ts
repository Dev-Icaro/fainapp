import AppException from '@common/exceptions/AppException';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import Helpers from '@common/utils/Helpers';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';
import IUserRepository from '@modules/user/infra/interfaces/IUserRepository';

export default class DeleteUserService implements IService<void> {
  constructor(
    private readonly appContext: AppContext,
    private readonly userRepo: IUserRepository,
  ) {}

  public async execute(userId: number): Promise<void> {
    const existsById = await this.userRepo.existsById(userId);
    if (!existsById) {
      throw new AppException(
        Helpers.formatErrorMessage(UserErrorMessages.USER_NOT_FOUND, [userId]),
      );
    }
    return this.userRepo.deleteUser(userId);
  }
}
