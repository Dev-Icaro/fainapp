import IEmail from '@common/interfaces/IEmail';
import IService from '@common/interfaces/IService';
import EmailSenderFactory from '@common/utils/EmailSenderFactory';
import IUserVerificationInfo from '@modules/user/domain/dtos/IUserVerificationInfo';

export default class SendVerificationEmailService implements IService<void> {
  public async execute(userVerificationInfo: IUserVerificationInfo): Promise<void> {
    const email = this.generateVerificationEmail(userVerificationInfo);
    const emailSender = EmailSenderFactory.getEmailSender();
    return emailSender.sendEmail(email);
  }

  private generateVerificationEmail(userVerificationInfo: IUserVerificationInfo): IEmail {
    const emailHtml = `
      <div>
        Seja bem-vindo ${userVerificationInfo.mail}
        Aqui está seu código de verificação ${userVerificationInfo.verificationCode}
      </div>
    `;

    return {
      from: process.env.SMTP_USER,
      subject: 'Email de verificação - FAINAPP.',
      to: [userVerificationInfo.mail],
      html: emailHtml,
    };
  }
}
