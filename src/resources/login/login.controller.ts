import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async authorizeUser(@Body() createLoginDto: CreateLoginDto) {
    const token = await this.loginService.authorizeUser(createLoginDto);
    if (!token) throw new ForbiddenException();
    return token;
  }
}
