import AppException from '@common/exceptions/AppException';
import IService from '@common/interfaces/IService';
import AppContext from '@common/utils/AppContext';
import Helpers from '@common/utils/Helpers';
import RepositoryFactory from '@common/utils/RepositoryFactory';
import { BCRYPT_SALT_ROUNDS } from '@common/utils/systemConstants';
import ICreateUserDTO from '@modules/user/domain/dtos/ICreateUserDTO';
import { UserErrorMessages } from '@modules/user/domain/error-messages/UserErrorMessages';
import bcrypt from 'bcrypt';
import RedisCache from '@common/cache/RedisCache';
import IUserVerificationInfo from '@modules/user/domain/dtos/IUserVerificationInfo';
import EmailSenderFactory from '@common/utils/EmailSenderFactory';
import IEmail from '@common/interfaces/IEmail';

export default class CreateUserService implements IService<void> {
  constructor(private readonly appContext: AppContext) {}

  public async execute(createUserDTO: ICreateUserDTO): Promise<void> {
    const userRepo = RepositoryFactory.getUserRepository();
    const existsByMail = await userRepo.existsByMail(
      this.appContext.getClient(),
      createUserDTO.mail,
    );
    if (existsByMail) {
      throw new AppException(
        Helpers.formatErrorMessage(UserErrorMessages.USER_WITH_MAIL_ALREDY_EXISTS, [
          createUserDTO.mail,
        ]),
      );
    }

    createUserDTO.password = await bcrypt.hash(createUserDTO.password, BCRYPT_SALT_ROUNDS);
    await userRepo.createUser(this.appContext.getClient(), createUserDTO);

    const verificationCode = Helpers.generateRandomNumber(1000, 9999);
    this.sendVerificationEmail({
      mail: createUserDTO.mail,
      verificationCode,
    });
  }

  private async sendVerificationEmail(userVerificationInfo: IUserVerificationInfo): Promise<void> {
    const email = this.generateVerificationEmail(userVerificationInfo);
    const emailSender = EmailSenderFactory.getEmailSender();
    await emailSender.sendEmail(email);
    await RedisCache.getClient().set(
      userVerificationInfo.mail,
      userVerificationInfo.verificationCode,
      'EX',
      10 * 60,
    );
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
