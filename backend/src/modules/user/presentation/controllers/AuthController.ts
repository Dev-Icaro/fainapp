import TYPES from '@common/injections/types';
import InputValidator, { DataTypes } from '@common/utils/InputValidator';
import IAuthUseCases from '@modules/user/domain/use-cases/IAuthUseCases';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { HttpStatus } from '@common/utils/systemConstants';

@injectable()
export default class AuthController {
  constructor(@inject(TYPES.IAuthUseCases) private readonly authUseCases: IAuthUseCases) {}

  public async verify(request: Request, response: Response): Promise<Response> {
    let { mail, verificationCode } = request.body;
    mail = InputValidator.checkTypeAndAsign(mail, { name: 'Email do usuário' });
    verificationCode = InputValidator.checkTypeAndAsign(verificationCode, {
      name: 'Codigo de verificação',
      varType: DataTypes.NUMBER,
    });

    await this.authUseCases.verify({
      mail,
      verificationCode,
    });

    return response.status(HttpStatus.NO_CONTENT).send();
  }

  public async signup(request: Request, response: Response): Promise<Response> {
    let { name, password, mail } = request.body;
    name = InputValidator.checkTypeAndAsign(name, { name: 'Nome do usuário' });
    password = InputValidator.checkTypeAndAsign(password, { name: 'Senha do usuário' });
    mail = InputValidator.checkTypeAndAsign(mail, { name: 'Email do usuário' });

    await this.authUseCases.signup({
      name,
      password,
      mail,
    });

    return response.status(HttpStatus.NO_CONTENT).send();
  }

  public async login(request: Request, response: Response): Promise<Response> {
    let { mail, password } = request.body;
    mail = InputValidator.checkTypeAndAsign(mail, { name: 'Email do usuário' });
    password = InputValidator.checkTypeAndAsign(password, { name: 'Senha do usuário' });

    const tokenInfo = await this.authUseCases.login({
      mail,
      password,
    });
    response.cookie(process.env.REFRESH_TOKEN_COOKIE_NAME, tokenInfo.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(
        Date.now() + Number(process.env.REFRESH_TOKEN_DURATION_MINUTES) * 60 * 1000,
      ),
    });
    return response.json({ accessToken: tokenInfo.accessToken });
  }

  public async refresh(request: Request, response: Response): Promise<Response> {
    const tokenInfo = await this.authUseCases.refresh(response.locals.refreshTokenHash);
    response.cookie(process.env.REFRESH_TOKEN_COOKIE_NAME, tokenInfo.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(
        Date.now() + Number(process.env.REFRESH_TOKEN_DURATION_MINUTES) * 60 * 1000,
      ),
    });
    return response.json({ accessToken: tokenInfo.accessToken });
  }

  public async logout(request: Request, response: Response): Promise<Response> {
    await this.authUseCases.logout(response.locals.refreshTokenHash);
    response.clearCookie(process.env.REFRESH_TOKEN_COOKIE_NAME);
    return response.status(HttpStatus.NO_CONTENT).send();
  }
}
