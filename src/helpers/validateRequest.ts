import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { validateToken } from './validateToken';

const validateRequest = async (req: Request) => {
  if (req.url === '/') {
    return true;
  }
  if (req.url === '/doc') {
    return true;
  }
  if (req.url === '/login') {
    return true;
  }
  const sessionToken = req.headers.authorization;
  if (!sessionToken) throw new UnauthorizedException();

  const isValid = validateToken(sessionToken);
  if (isValid === false) throw new UnauthorizedException();

  const token = sessionToken.split(' ')[1];
  try {
    const verification = await jwt.verify(token, JWT_SECRET_KEY);
    if (verification) return true;
  } catch (e) {
    process.stdout.write(`${e}\n`);
  }
  throw new UnauthorizedException();
};

export { validateRequest };
