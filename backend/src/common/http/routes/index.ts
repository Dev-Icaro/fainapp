import { Router, Request, Response } from 'express';
import userRouter from '@modules/user/presentation/routes/user.routes';
import authRouter from '@modules/user/presentation/routes/auth.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  response.json({
    message: 'Hello World!',
  });
});

routes.use('/user', userRouter);
routes.use('/auth', authRouter);

export default routes;
