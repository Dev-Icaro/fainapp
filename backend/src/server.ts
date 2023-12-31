import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import 'cookie-parser';
import AppException from '@common/exceptions/AppException';
import { HttpStatus } from '@common/utils/systemConstants';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from '@common/http/routes';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof AppException) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  } else {
    console.error(error);
    return response.status(HttpStatus.SERVER_ERROR).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

const port = process.env.APP_PORT || 3333;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});
