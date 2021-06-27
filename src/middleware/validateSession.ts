import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../utils/validateToken'

const validateSession = async (req: Request, res: Response, next: NextFunction) => {
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
  // console.log(sessionToken);
  if (!sessionToken) return res.status(401).send({ message: "No token provided." });
  const isValid = validateToken(sessionToken);
  if (isValid === false) return res.status(401).send({ message: "Authentication must follow Bearer scheme." });
  return next();
}

export { validateSession }