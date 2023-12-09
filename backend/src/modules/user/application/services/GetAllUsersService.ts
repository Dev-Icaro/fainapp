import AppException from '@common/exceptions/AppException';
import IPaginationParams from '@common/interfaces/IPaginationParams';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import RepositoryFactory from '@common/utils/RepositoryFactory';
import IUserPaginationDTO from '@modules/user/domain/dtos/IUserPaginationDTO';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';

export default class GetAllUsersService implements IService<IUserPaginationDTO> {
  constructor(private readonly appContext: AppContext) {}

  public async execute(paginationParams: IPaginationParams): Promise<IUserPaginationDTO> {
    const userRepo = RepositoryFactory.getUserRepository();
    const users = await userRepo.getAllUsers(this.appContext.getClient(), paginationParams);
    const totalUsersCount = await userRepo.countUsers(this.appContext.getClient());
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
          };
        }),
      };
    } else {
      throw new AppException(UserErrorMessages.USERS_NOT_FOUND);
    }
  }
}
