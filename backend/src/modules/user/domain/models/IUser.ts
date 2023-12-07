import IControlFields from '@common/interfaces/IControlFields';

export default interface IUser extends IControlFields {
  userId: number;
  mail: string;
  password: string;
  name: string;
}
