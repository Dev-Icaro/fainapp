import { container } from '@common/injections/inversify.config';
import TYPES from '@common/injections/types';
import IEmailSender from '@common/interfaces/IEmailSender';

export default class EmailSenderFactory {
  public static getEmailSender(): IEmailSender {
    return container.get<IEmailSender>(TYPES.IEmailSender);
  }
}
