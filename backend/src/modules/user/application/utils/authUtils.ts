import { HttpStatus } from '@common/utils/systemConstants';
import IUserTokenInfo from '@modules/user/domain/dtos/IUserTokenInfo';
import { AuthErrorMessages } from '@modules/user/domain/error-messages/AuthErrorMessages';
import { createHmac } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AccessTokenPayload extends JwtPayload, IUserTokenInfo {}

export const createAccessToken = (user: IUserTokenInfo) => {
  return jwt.sign(
    { name: user.name, email: user.email, userId: user.userId },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      audience: 'urn:jwt:type:access',
      issuer: 'urn:system:token-issuer:type:access',
      expiresIn: `${process.env.ACCESS_TOKEN_DURATION_MINUTES}m`,
    },
  );
};

export const createRefreshToken = (mail: string) => {
  return jwt.sign({ mail }, process.env.REFRESH_TOKEN_SECRET!, {
    audience: 'urn:jwt:type:refresh',
    issuer: 'urn:system:token-issuer:type:refresh',
    expiresIn: `${process.env.REFRESH_TOKEN_DURATION_MINUTES}m`,
  });
};

export const createHashForRefreshToken = (token: string) => {
  return createHmac('sha512', process.env.REFRESH_TOKEN_SECRET!).update(token).digest('hex');
};

export const withRefreshAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME];
  if (!token) {
    return res.status(HttpStatus.UNAUTHORIZED).send(AuthErrorMessages.UNAUTHORIZED);
  }
  try {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, {
      audience: 'urn:jwt:type:refresh',
    });
    res.locals.refreshTokenHash = createHashForRefreshToken(token);
    next();
  } catch (error) {
    return res.status(HttpStatus.UNAUTHORIZED).send(AuthErrorMessages.INVALID_CREDENTIALS);
  }
};

export const withAccessAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split('Bearer ')[1];
  if (!token) {
    return res.status(HttpStatus.UNAUTHORIZED).send(AuthErrorMessages.UNAUTHORIZED);
  }
};
