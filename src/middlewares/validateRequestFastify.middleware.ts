import { Injectable, NestMiddleware } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
// import { JWT_SECRET_KEY } from '../common/config';
import { validateToken } from '../helpers/validateToken';

@Injectable()
export class validateRequestFastify implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    console.log(req.url);
    if (req.url === '/') {
      return next();
    }
    if (req.url === '/doc') {
      return next();
    }
    if (req.url === '/login') {
      console.log('Im here!');
      return next();
    }
    const sessionToken = req.headers.authorization;
    if (!sessionToken) throw new UnauthorizedException();

    const isValid = validateToken(sessionToken);
    if (isValid === false) throw new UnauthorizedException();

    const token = sessionToken.split(' ')[1];
    try {
      // TODO: use env for secret key
      const verification = jwt.verify(token, 'my-secret-key');
      if (verification) return next();
    } catch (e) {
      // TODO: use logger
      console.log(e);
    }
    throw new UnauthorizedException();
  }
}
