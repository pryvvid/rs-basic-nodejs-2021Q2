import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async authenticateUser(@Body() createLoginDto: CreateLoginDto) {
    const token = await this.loginService.authenticateUser(createLoginDto);
    if (!token) throw new ForbiddenException();
    return token;
  }
}
