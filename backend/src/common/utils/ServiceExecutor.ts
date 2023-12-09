import AppContext from '@common/utils/AppContext';
import IService from '@common/interfaces/IService';

export default class ServiceExecutor {
  public static async execute<T>(
    serviceConstructor: new (context: AppContext) => IService<T>,
    ...args: any[]
  ): Promise<T> {
    const appContext = new AppContext();
    try {
      await appContext.beginTransaction();
      const service = new serviceConstructor(appContext);
      const result: T = await service.execute(...args);
      await appContext.commit();
      return result;
    } catch (e) {
      await appContext.rollback();
      throw e;
    } finally {
      await appContext.release();
    }
  }
}
