import IEmail from './IEmail';
import IEmailSendingResult from './IEmailSendingResult';
export default interface IEmailSender {
  sendEmail(email: IEmail): Promise<IEmailSendingResult>;
}
