import IService from '@common/interfaces/IService';
import ISignupDTO from '@modules/user/domain/dtos/ISignupDTO';
import CreateUserService from './CreateUserService';
import AppContext from '@common/utils/AppContext';
import Helpers from '@common/utils/Helpers';
import IUserVerificationInfo from '@modules/user/domain/dtos/IUserVerificationInfo';
import EmailSenderFactory from '@common/utils/EmailSenderFactory';
import IEmail from '@common/interfaces/IEmail';

export default class SignupService implements IService<void> {
  constructor(private readonly appContext: AppContext) {}

  public async execute(signupDTO: ISignupDTO): Promise<void> {
    const createUserService = new CreateUserService(this.appContext);
    await createUserService.execute(signupDTO);

    const verificationCode = Helpers.generateRandomNumber(1000, 9999);
    const email = this.generateVerificationEmail({
      mail: signupDTO.mail,
      verificationCode,
    });
    const emailSender = EmailSenderFactory.getEmailSender();
    await emailSender.sendEmail(email);
  }

  private generateVerificationEmail(userVerificationInfo: IUserVerificationInfo): IEmail {
    const emailHtml = `
      <div>
        Seja bem-vindo ${userVerificationInfo.mail} <br />
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
