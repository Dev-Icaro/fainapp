import { Router, Request, Response } from 'express';
import userRoutes from '@modules/user/presentation/routes/user.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  response.json({
    message: 'Hello World!',
  });
});

routes.use('/user', userRoutes);

export default routes;
