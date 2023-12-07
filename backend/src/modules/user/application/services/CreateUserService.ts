import AppException from '@common/exceptions/AppException';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import Helpers from '@common/utils/Helpers';
import ICreateUserDTO from '@modules/user/domain/dtos/ICreateUserDTO';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';
import IUserRepository from '@modules/user/infra/interfaces/IUserRepository';

export default class CreateUserService implements IService<void> {
  constructor(
    private readonly appContext: AppContext,
    private readonly userRepo: IUserRepository,
  ) {}

  public async execute(createUserDTO: ICreateUserDTO): Promise<void> {
    const existsByMail = await this.userRepo.existsByMail(createUserDTO.mail);
    if (existsByMail) {
      throw new AppException(
        Helpers.formatErrorMessage(UserErrorMessages.USER_WITH_MAIL_ALREDY_EXISTS, [
          createUserDTO.mail,
        ]),
      );
    }
    return this.userRepo.createUser(createUserDTO);
  }
}
