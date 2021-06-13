import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
// import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { ApiError } from '../error/ApiError';
import { createLogger } from '../utils/writeLog';

// const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = StatusCodes;

const apiErrorHandler = (err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
  const log = createLogger('./../logs/errorLog.txt');
  const date = new Date().toUTCString()
  
  if (err instanceof ApiError) {
    log.write(`${date}\n${err.code}\n${err.message}\n------\n`)
    res.status(err.code).json({ message: err.message });
    return;
  }

  log.write(`${date}\n500\nsomething went wrong\n------\n`)
  res.status(500).json({ message: "something went wrong" })
}

export { apiErrorHandler }
