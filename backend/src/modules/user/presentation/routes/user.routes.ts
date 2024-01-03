import { Router } from 'express';
import UserController from '../controllers/UserController';
import { container } from '@common/injections/inversify.config';

const userRouter = Router();
const userController = container.resolve(UserController);

userRouter
  .route('/')
  .get(userController.getAll.bind(userController))
  .post(userController.signup.bind(userController));

userRouter
  .route('/:id')
  .get(userController.getById.bind(userController))
  .put(userController.update.bind(userController))
  .delete(userController.delete.bind(userController));

export default userRouter;
