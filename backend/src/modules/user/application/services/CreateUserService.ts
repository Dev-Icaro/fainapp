import AppException from '@common/exceptions/AppException';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import Helpers from '@common/utils/Helpers';
import RepositoryFactory from '@common/utils/RepositoryFactory';
import { BCRYPT_SALT_ROUNDS } from '@common/utils/systemConstants';
import ICreateUserDTO from '@modules/user/domain/dtos/ICreateUserDTO';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';
import bcrypt from 'bcrypt';

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

    createUserDTO.password = await bcrypt.hash(createUserDTO.password, BCRYPT_SALT_ROUNDS);
    await userRepo.createUser(this.appContext.getClient(), createUserDTO);
  }
}
