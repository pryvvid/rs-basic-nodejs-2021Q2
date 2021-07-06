import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  authorizeUser(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.authorizeUser(createLoginDto);
  }
}
