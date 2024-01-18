import { toast } from 'react-toastify';

export default class Notificator {
  public static error(message: string) {
    toast.error(message);
  }

  public static success(message: string) {
    toast.success(message);
  }

  public static warning(message: string) {
    toast.warning(message);
  }
}
