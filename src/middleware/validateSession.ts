import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm'
import { User } from '../entity/User';
import { JWT_SECRET_KEY } from '../common/config'
import { validateToken } from '../utils/validateToken'
import { ApiError } from '../error/ApiError';

const validateSession = async (req: Request, _res: Response, next: NextFunction) => {
  if (req.path === "/") {
    return next();
  }
  if (req.path === "/doc") {
    return next();
  }
  if (req.path === "/login") {
    return next();
  }
  const sessionToken = req.headers.authorization;
  if (!sessionToken) return next(ApiError.unauthorized("No token provided."));
  // return res.status(401).send({ message: "No token provided." });
  const isValid = validateToken(sessionToken);
  if (isValid === false) return next(ApiError.unauthorized("Authentication must follow Bearer scheme."));
  // return res.status(401).send({ message: "Authentication must follow Bearer scheme." });
  const token = sessionToken.split(" ")[1];
  try {
    const verification = await jwt.verify(token as string, JWT_SECRET_KEY as string);
    if (verification) {
      const userRepo = getRepository(User);
      // @ts-ignore
      const { userId } = verification
      const user = await userRepo.findOne({ where: { id: userId } });
      if (user) {
        return next();
      }
      return next(ApiError.unauthorized("Unauthorized."));
    }
  } catch(e) {
    return next(ApiError.unauthorized(e));
  }
  return next(ApiError.internal("Something went wrong"));
}

export { validateSession }