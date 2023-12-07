import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserUseCasesImpl from '@modules/user/application/use-cases-impl/UserUseCasesImpl';

const userUseCases = new UserUseCasesImpl();
const userController = new UserController(userUseCases);

const userRoutes = Router();

userRoutes
  .route('/')
  .get(userController.getAll.bind(userController))
  .post(userController.create.bind(userController));

userRoutes
  .route('/:id')
  .get(userController.getById.bind(userController))
  .put(userController.update.bind(userController))
  .delete(userController.delete.bind(userController));

export default userRoutes;
