import express, { Request, Response, NextFunction } from 'express';

import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import { logger } from './middleware/logger';
// import { createLogger } from './utils/writeLog';
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

// process.on('uncaughtException', (error) => {
//   const writeStream = createLogger('./errorLog.txt');
//   writeStream.write((new Date()).toUTCString());
//   writeStream.write('\n');
//   writeStream.write(error.message);
//   writeStream.write('\n');
//   writeStream.write(error.stack);
//   writeStream.write('\n');
//   writeStream.end();
//   process.stdout.write("uncaughtException occured\nExit from app");
//   process.exit(1);
// });

// interface unhandledRejectionError {
//   message: string;
//   stack: string;
// }

// process.on('unhandledRejection', (error: unhandledRejectionError, p) => {
//   console.log("Error message:", error.message);
//   console.log("Error stack:", error.stack);
//   console.log("Promise:", p);
//   const writeStream = createLogger('./errorLog.txt');
//   writeStream.write((new Date()).toUTCString());
//   writeStream.write('\n');
//   writeStream.write(error.message.toString());
//   writeStream.write('\n');
//   writeStream.write(error.stack.toString());
//   writeStream.write('\n');
//   // writeStream.write(p);
//   // writeStream.write('\n');
//   writeStream.end();
//   process.stdout.write("unhandledRejection occured\nExit from app");
//   process.exit(1);
// });

// setTimeout(() => {
//   app.emit('uncaughtException')
// }, 5000)

// setTimeout(() => {
//   Promise.reject(Error('Oops!'));
// }, 3000)

export { app };
