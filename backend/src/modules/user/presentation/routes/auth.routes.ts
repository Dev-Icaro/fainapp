import { container } from '@common/injections/inversify.config';
import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { withRefreshAuth } from '@modules/user/application/utils/authUtils';

const authRouter = Router();
const authController = container.resolve(AuthController);

authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/refresh', withRefreshAuth, authController.refresh.bind(authController));
authRouter.post('/logout', withRefreshAuth, authController.logout.bind(authController));

export default authRouter;
