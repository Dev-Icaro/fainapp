import transporter from '@config/email';
import IEmailSender from '@common/interfaces/IEmailSender';
import IEmail from '@common/interfaces/IEmail';
import { injectable } from 'inversify';

@injectable()
export default class EmailSenderImpl implements IEmailSender {
  async sendEmail(email: IEmail): Promise<void> {
    await transporter
      .sendMail({
        from: email.from,
        subject: email.subject,
        text: email.text,
        html: email.html,
        to: email.to.join(','),
        attachments: email.attachments,
      })
      .catch(error => {
        if (error instanceof Error) {
          throw new Error(`Fail while sending mail with message:\n${error.message}`);
        }
      });
  }
}
