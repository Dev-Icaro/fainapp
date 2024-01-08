import IPaginationParams from '@common/interfaces/IPaginationParams';
import AppContext from '@common/utils/AppContext';
import IUpdateUserDTO from '@modules/user/domain/dtos/IUpdateUserDTO';
import IUserDTO from '@modules/user/domain/dtos/IUserDTO';
import IUserPaginationDTO from '@modules/user/domain/dtos/IUserPaginationDTO';
import IUserUseCases from '@modules/user/domain/use-cases/IUserUseCases';
import GetUserByIdService from '../services/GetUserByIdService';
import GetAllUsersService from '../services/GetAllUsersService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';
import { injectable } from 'inversify';

@injectable()
export default class UserUseCasesImpl implements IUserUseCases {
  public async getUserById(userId: number): Promise<IUserDTO> {
    const appContext = new AppContext();
    try {
      await appContext.beginTransaction();
      const getUserByIdService = new GetUserByIdService(appContext);
      const userDTO = await getUserByIdService.execute(userId);
      await appContext.commit();
      return userDTO;
    } catch (error) {
      await appContext.rollback();
      throw error;
    } finally {
      appContext.release();
    }
  }

  public async getAllUsers(paginationParams: IPaginationParams): Promise<IUserPaginationDTO> {
    const appContext = new AppContext();
    try {
      await appContext.beginTransaction();
      const getAllUsersService = new GetAllUsersService(appContext);
      const userPaginationDTO = await getAllUsersService.execute(paginationParams);
      await appContext.commit();
      return userPaginationDTO;
    } catch (error) {
      await appContext.rollback();
      throw error;
    } finally {
      appContext.release();
    }
  }

  public async updateUser(updateUserDTO: IUpdateUserDTO): Promise<void> {
    const appContext = new AppContext();
    try {
      await appContext.beginTransaction();
      const updateUserService = new UpdateUserService(appContext);
      await updateUserService.execute(updateUserDTO);
      await appContext.commit();
    } catch (error) {
      await appContext.rollback();
      throw error;
    } finally {
      appContext.release();
    }
  }

  public async deleteUser(userId: number): Promise<void> {
    const appContext = new AppContext();
    try {
      await appContext.beginTransaction();
      const deleteUserService = new DeleteUserService(appContext);
      await deleteUserService.execute(userId);
      await appContext.commit();
    } catch (error) {
      await appContext.rollback();
      throw error;
    } finally {
      appContext.release();
    }
  }
}
