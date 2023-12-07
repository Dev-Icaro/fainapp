import IPaginationInfo from '@common/interfaces/IPaginationInfo';
import IUserDTO from './IUserDTO';

export default interface IUserPaginationDTO extends IPaginationInfo {
  data: IUserDTO[];
}
