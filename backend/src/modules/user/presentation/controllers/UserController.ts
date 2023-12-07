import InputValidator, { DataTypes } from '@common/utils/InputValidator';
import { HttpStatus } from '@common/utils/systemConstants';
import IUserUseCases from '@modules/user/domain/use-cases/IUserUseCases';
import { Request, Response } from 'express';

export default class UserController {
  constructor(private readonly userUseCases: IUserUseCases) {}

  public async getById(request: Request, response: Response): Promise<Response> {
    let id = Number(request.params.id);
    id = InputValidator.checkTypeAndAsign(id, { name: 'Id do usuário', varType: DataTypes.NUMBER });

    const userDTO = await this.userUseCases.getUserById(id);
    return response.json(userDTO);
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const orderBy = request.query.orderBy ? String(request.query.orderBy) || null : null;
    const page = request.query.page ? Number(request.query.page) || 0 : 0;
    const perPage = request.query.perPage ? Number(request.query.perPage) || 15 : 15;

    const userPaginationDTO = await this.userUseCases.getAllUsers({
      page,
      perPage,
      orderBy: orderBy.split(','),
    });

    return response.json(userPaginationDTO);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    let { name, password, mail } = request.body;
    name = InputValidator.checkTypeAndAsign(name, { name: 'Nome do usuário' });
    password = InputValidator.checkTypeAndAsign(password, { name: 'Senha do usuário' });
    mail = InputValidator.checkTypeAndAsign(mail, { name: 'Email do usuário' });

    await this.userUseCases.createUser({
      name,
      password,
      mail,
    });

    return response.status(HttpStatus.NO_CONTENT).send();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    let { name, password, mail } = request.body;
    let id = Number(request.params.id);
    id = InputValidator.checkTypeAndAsign(id, { name: 'Id do usuário', varType: DataTypes.NUMBER });
    name = InputValidator.checkTypeAndAsign(name, { name: 'Nome do usuário' });
    password = InputValidator.checkTypeAndAsign(password, { name: 'Senha do usuário' });
    mail = InputValidator.checkTypeAndAsign(mail, { name: 'Email do usuário' });

    await this.userUseCases.updateUser({
      userId: id,
      name,
      password,
      mail,
    });

    return response.status(HttpStatus.NO_CONTENT).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    let id = Number(request.params.id);
    id = InputValidator.checkTypeAndAsign(id, { name: 'Id do usuário', varType: DataTypes.NUMBER });

    await this.userUseCases.deleteUser(id);
    return response.status(HttpStatus.NO_CONTENT).send();
  }
}
