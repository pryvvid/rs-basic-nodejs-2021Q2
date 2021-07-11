import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginService) {
    super({ usernameField: 'login' });
  }

  async validate({ login, password }: CreateLoginDto): Promise<any> {
    const user = await this.loginService.authenticateUser({ login, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
