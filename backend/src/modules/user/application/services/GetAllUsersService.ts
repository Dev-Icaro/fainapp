import AppException from '@common/exceptions/AppException';
import IPaginationParams from '@common/interfaces/IPaginationParams';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import IUserPaginationDTO from '@modules/user/domain/dtos/IUserPaginationDTO';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';
import IUserRepository from '@modules/user/infra/interfaces/IUserRepository';

export default class GetAllUsersService implements IService<IUserPaginationDTO> {
  constructor(
    private readonly appContext: AppContext,
    private readonly userRepo: IUserRepository,
  ) {}

  public async execute(paginationParams: IPaginationParams): Promise<IUserPaginationDTO> {
    const users = await this.userRepo.getAllUsers(paginationParams);
    const totalUsersCount = await this.userRepo.countUsers();
    if (users && users.length > 0) {
      return {
        currentPage: paginationParams.page,
        perPage: paginationParams.perPage,
        total: totalUsersCount,
        data: users.map(user => {
          return {
            userId: user.userId,
            mail: user.mail,
            name: user.name,
            password: user.password,
          };
        }),
      };
    } else {
      throw new AppException(UserErrorMessages.USERS_NOT_FOUND);
    }
  }
}
