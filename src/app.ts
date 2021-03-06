import express, { Request, Response, NextFunction } from 'express';
import "reflect-metadata";
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import cors from 'cors';
import { writeFileSync } from 'fs';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import { router as loginRouter } from './resources/login/login.router';
import { logger } from './middleware/logger';
import { apiErrorHandler } from './middleware/errorHandler';
import { validateSession } from './middleware/validateSession';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(cors());
app.use(express.json());

app.all('*', logger)

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Docker TS Service is running!');
    return;
  }
  next();
});

app.use(validateSession);
app.use('/login', loginRouter)
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use(apiErrorHandler);

process.on('uncaughtException', (error) => {
  const date = new Date().toUTCString();
  const message = `\n${date}\n${error.message}\n${error.stack}`;
  const logPath = path.join(__dirname, "../logs/errorLog.txt")
  writeFileSync(logPath, message, {flag: 'a'});
  process.stdout.write("uncaughtException occured\nExit from app\n");
  process.exit(1);
});

interface IUnhandledRejectionError {
  message: string;
  stack: string;
}

process.on('unhandledRejection', (error: IUnhandledRejectionError) => {
  const date = new Date().toUTCString();
  const message = `\n${date}\n${error.message}\n${error.stack}`;
  const logPath = path.join(__dirname, "../logs/errorLog.txt")
  writeFileSync(logPath, message, {flag: 'a'});
  process.stdout.write("\nunhandledRejection occured\nExit from app\n");
  process.exit(1);
});

// setTimeout(() => {
//   throw new Error('oopps!')
// }, 1000);

export { app };
