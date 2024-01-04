import IEmail from './IEmail';

export default interface IEmailSender {
  sendEmail(email: IEmail): Promise<void>;
}
