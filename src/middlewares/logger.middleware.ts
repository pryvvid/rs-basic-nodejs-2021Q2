import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createLogger } from '../helpers/createLogger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, url, query, body } = request;

    response.on('finish', () => {
      const writeStream = createLogger('../../logs/log.txt');
      const { statusCode } = response;
      const formattedQuery = JSON.stringify(query);
      const formattedBody = JSON.stringify(body);
      const message = `\nMethod: ${method}\nUrl: ${url}\nQuery: ${formattedQuery}\nBody: ${formattedBody}\nStatus code: ${statusCode}\n`;
      this.logger.log(`${message}`);
      writeStream.write(new Date().toUTCString());
      writeStream.write(message.toString());
      writeStream.end(`-----\n`);
    });

    next();
  }
}
