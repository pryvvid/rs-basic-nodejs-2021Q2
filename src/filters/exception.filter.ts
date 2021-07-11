import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message;
    switch (status) {
      case 400:
        message = 'BAD REQUEST';
        break;
      case 401:
        message = 'UNAUTHORIZED';
        break;
      case 403:
        message = 'FORBIDDEN';
        break;
      case 404:
        message = 'NOT FOUND';
        break;
      case 500:
        message = 'INTERNAL SERVER ERROR';
        break;
      default:
        message = 'Something went wrong';
        break;
    }

    response.status(status).send({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
