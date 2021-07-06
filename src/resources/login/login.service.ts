import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../../entity/User';
import { CreateLoginDto } from './dto/create-login.dto';
import { JwtToken } from '../../common/types';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // TODO: change jwt secret key with env const

  async authorizeUser({
    login,
    password,
  }: CreateLoginDto): Promise<JwtToken | undefined> {
    const user = await this.usersRepository.findOne({ where: { login } });
    if (user) {
      const hashedPassword = user.password;
      const userId = user.id;
      const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
      if (isPasswordMatching) {
        const token = jwt.sign({ userId, login }, 'my-secret-key', {
          expiresIn: 60 * 60,
        });
        return { token };
      }
    }
    return undefined;
  }
}
