import { Router } from 'express';
import UserController from '../controllers/UserController';
import { container } from '@common/injections/inversify.config';

const userRoutes = Router();
const userController = container.resolve(UserController);

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
