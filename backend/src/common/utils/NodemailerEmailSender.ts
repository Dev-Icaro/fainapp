import transporter from '@config/email';
import IEmailSender from '@common/interfaces/IEmailSender';
import IEmail from '@common/interfaces/IEmail';
import { injectable } from 'inversify';
import IEmailSendingResult from '@common/interfaces/IEmailSendingResult';
@injectable()
class NodemailerEmailSender implements IEmailSender {
  async sendEmail(email: IEmail): Promise<IEmailSendingResult> {
    return transporter
      .sendMail({
        from: email.from,
        subject: email.subject,
        text: email.text,
        html: email.html,
        to: email.to.join(','),
        attachments: email.attachments,
      })
      .then(() => {
        return {
          success: true,
          error: null,
        };
      })
      .catch(error => {
        return {
          success: false,
          error: error,
        };
      });
  }
}

export { NodemailerEmailSender };
