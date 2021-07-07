import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
// import { JWT_SECRET_KEY } from '../common/config';
import { validateToken } from './validateToken';

const validateRequest = async (req: Request) => {
  if (req.path === '/') {
    return true;
  }
  if (req.path === '/doc') {
    return true;
  }
  if (req.path === '/login') {
    return true;
  }
  const sessionToken = req.headers.authorization;
  if (!sessionToken) throw new UnauthorizedException();

  const isValid = validateToken(sessionToken);
  if (isValid === false) throw new UnauthorizedException();

  const token = sessionToken.split(' ')[1];
  try {
    // TODO: use env for secret key
    const verification = await jwt.verify(token, 'my-secret-key');
    if (verification) return true;
  } catch (e) {
    // TODO: use logger
    console.log(e);
  }
  throw new UnauthorizedException();
};

export { validateRequest };
