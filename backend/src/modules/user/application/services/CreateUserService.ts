import AppException from '@common/exceptions/AppException';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import Helpers from '@common/utils/Helpers';
import RepositoryFactory from '@common/utils/RepositoryFactory';
import ICreateUserDTO from '@modules/user/domain/dtos/ICreateUserDTO';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';

export default class CreateUserService implements IService<void> {
  constructor(private readonly appContext: AppContext) {}

  public async execute(createUserDTO: ICreateUserDTO): Promise<void> {
    const userRepo = RepositoryFactory.getUserRepository();
    const existsByMail = await userRepo.existsByMail(
      this.appContext.getClient(),
      createUserDTO.mail,
    );
    if (existsByMail) {
      throw new AppException(
        Helpers.formatErrorMessage(UserErrorMessages.USER_WITH_MAIL_ALREDY_EXISTS, [
          createUserDTO.mail,
        ]),
      );
    }
    return userRepo.createUser(this.appContext.getClient(), createUserDTO);
  }
}
