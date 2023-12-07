import AppException from '@common/exceptions/AppException';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import Helpers from '@common/utils/Helpers';
import IUpdateUserDTO from '@modules/user/domain/dtos/IUpdateUserDTO';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';
import IUserRepository from '@modules/user/infra/interfaces/IUserRepository';

export default class UpdateUserService implements IService<void> {
  constructor(
    private readonly appContext: AppContext,
    private readonly userRepo: IUserRepository,
  ) {}

  public async execute(updateUserDTO: IUpdateUserDTO): Promise<void> {
    const userByMail = await this.userRepo.getUserByMail(updateUserDTO.mail);
    if (userByMail && userByMail.userId !== updateUserDTO.userId) {
      throw new AppException(
        Helpers.formatErrorMessage(UserErrorMessages.USER_WITH_MAIL_ALREDY_EXISTS, [
          updateUserDTO.mail,
        ]),
      );
    }
    return this.userRepo.updateUser(updateUserDTO);
  }
}
