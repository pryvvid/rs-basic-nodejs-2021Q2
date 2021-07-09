import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { createLogger } from '../helpers/createLogger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    // const writeStream = createLogger('../../logs/log.txt');
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, query, body } = request;
    const { statusCode } = response;
    return next.handle().pipe(
      tap(() => {
        const formattedQuery = JSON.stringify(query);
        const formattedBody = JSON.stringify(body);
        const message = `\nMethod: ${method}\nUrl: ${url}\nQuery: ${formattedQuery}\nBody: ${formattedBody}\nStatus code: ${statusCode}\n`;
        console.log(`After... ${Date.now() - now}ms`);
        console.log(`${message}`);
        // writeStream.write(new Date().toUTCString());
        // writeStream.write(message.toString());
        // writeStream.end(`-----\n`);
      }),
    );
  }
}
