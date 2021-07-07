import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { validateRequest } from '../helpers/validateRequest';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
