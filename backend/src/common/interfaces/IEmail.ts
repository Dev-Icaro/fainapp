import IEmailAttachment from './IEmailAttachment';

export default interface IEmail {
  from: string;
  subject: string;
  text?: string;
  html?: string;
  to: string[];
  attachments?: IEmailAttachment[];
}
