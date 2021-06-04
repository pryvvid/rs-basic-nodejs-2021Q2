import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
// import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { ApiError } from '../error/ApiError';
import { createLogger } from '../utils/writeLog';

// const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = StatusCodes;

const apiErrorHandler = (err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
  const log = createLogger('./errorLog.txt');
  const date = new Date().toUTCString()
  console.error(err);
  
  if (err instanceof ApiError) {
    log.write(`${date}\n${err.code}\n${err.message}\n------\n`)
    res.status(err.code).json({ message: err.message });
    return;
  }

  log.write(`${date}\n500\nsomething went wrong\n------\n`)
  res.status(500).json({ message: "something went wrong" })
}

export { apiErrorHandler }

// class ValidationError extends Error {
//   status = BAD_REQUEST;
//   text = getReasonPhrase(this.status)
// }

// const errorHandler = (req: Request, res: Response, next: NextFunction) => {
//   if (!req.query['param'] || req.query['param'] !== 'value') {
//     throw new ValidationError()
//   }
//   throw new Error();
// };

// const validationErrorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof ValidationError) {
//     res.status(err.status).send(err.text);
//     return;
//   }
//   next(err);
// };

// const InternalErrorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
//   res.status(INTERNAL_SERVER_ERROR).send(getReasonPhrase(INTERNAL_SERVER_ERROR))
// };

