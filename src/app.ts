import express, { Request, Response, NextFunction } from 'express';

import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { writeFileSync } from 'fs';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import { logger } from './middleware/logger';
import { apiErrorHandler } from './middleware/errorHandler';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.all('*', logger)

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('TS Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use(apiErrorHandler);

process.on('uncaughtException', (error) => {
  const date = new Date().toUTCString();
  const message = `\n${date}\n${error.message}\n${error.stack}`;
  const logPath = path.join(__dirname, "./logs/errorLog.txt")
  writeFileSync(logPath, message, {flag: 'a'});
  process.stdout.write("uncaughtException occured\nExit from app");
  process.exit(1);
});

interface IUnhandledRejectionError {
  message: string;
  stack: string;
}

process.on('unhandledRejection', (error: IUnhandledRejectionError) => {
  const date = new Date().toUTCString();
  const message = `\n${date}\n${error.message}\n${error.stack}`;
  const logPath = path.join(__dirname, "./logs/errorLog.txt")
  writeFileSync(logPath, message, {flag: 'a'});
  process.stdout.write("\nunhandledRejection occured\nExit from app");
  process.exit(1);
});

export { app };
