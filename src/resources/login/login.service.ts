import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entity/User';
import { CreateLoginDto } from './dto/create-login.dto';
import { JwtToken } from '../../common/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async authenticateUser({
    login,
    password,
  }: CreateLoginDto): Promise<JwtToken | undefined> {
    const user = await this.usersRepository.findOne({ where: { login } });
    if (user) {
      const hashedPassword = user.password;
      const userId = user.id;
      const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
      if (isPasswordMatching) {
        const token = this.jwtService.sign({ userId, login });
        return { token };
      }
    }
    return undefined;
  }
}
