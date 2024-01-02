import IUpdateUserDTO from 'domain/user/dtos/IUpdateUserDTO';

export default interface IUserRepository {
  updateUser(updateUserDTO: IUpdateUserDTO): Promise<void>;
}
