import AppException from '@common/exceptions/AppException';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import Helpers from '@common/utils/Helpers';
import RepositoryFactory from '@common/utils/RepositoryFactory';
import IUpdateUserDTO from '@modules/user/domain/dtos/IUpdateUserDTO';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';

export default class UpdateUserService implements IService<void> {
  constructor(private readonly appContext: AppContext) {}

  public async execute(updateUserDTO: IUpdateUserDTO): Promise<void> {
    const userRepo = RepositoryFactory.getUserRepository();
    const userByMail = await userRepo.getUserByMail(
      this.appContext.getClient(),
      updateUserDTO.mail,
    );
    if (userByMail && userByMail.userId !== updateUserDTO.userId) {
      throw new AppException(
        Helpers.formatErrorMessage(UserErrorMessages.USER_WITH_MAIL_ALREDY_EXISTS, [
          updateUserDTO.mail,
        ]),
      );
    }
    return userRepo.updateUser(this.appContext.getClient(), updateUserDTO);
  }
}
