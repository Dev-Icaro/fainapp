import AppException from '@common/exceptions/AppException';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import Helpers from '@common/utils/Helpers';
import { HttpStatus } from '@common/utils/systemConstants';
import IUserDTO from '@modules/user/domain/dtos/IUserDTO';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';
import IUserRepository from '@modules/user/infra/interfaces/IUserRepository';

export default class GetUserByIdService implements IService<IUserDTO> {
  constructor(
    private readonly appContext: AppContext,
    private readonly userRepo: IUserRepository,
  ) {}

  public async execute(userId: number): Promise<IUserDTO> {
    const user = await this.userRepo.getById(userId);
    if (!user) {
      throw new AppException(
        Helpers.formatErrorMessage(UserErrorMessages.USERS_NOT_FOUND, [userId]),
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }
}
