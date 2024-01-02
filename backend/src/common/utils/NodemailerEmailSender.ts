import transporter from '@config/email';
import IEmailSender from '@common/interfaces/IEmailSender';
import IEmail from '@common/interfaces/IEmail';
import { injectable } from 'inversify';

@injectable()
class NodemailerEmailSender implements IEmailSender {
  sendEmail(email: IEmail): Promise<void> {
    return new Promise((resolve, reject) => {
      transporter.sendMail({
        from: email.from,
        subject: email.subject,
        text: email.text,
        html: email.html,
        to: email.to.join(','),
        attachments: email.attachments,
      });
    });
  }
}

export { NodemailerEmailSender };
