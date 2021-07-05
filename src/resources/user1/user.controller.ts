import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserDTO } from './dto/user.dto';

@Controller('users')
export class UserController {
  @Get()
  getUsers() {
    return 'All users';
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return `Get user by id ${id}`;
  }

  @Post()
  createUser(
    @Body() body: UserDTO,
    @Req() _req: Request,
    @Res() res: Response,
  ) {
    return res.status(200).json(body);
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: UserDTO) {
    return `Update user with id ${id} with data ${JSON.stringify(body)}`;
  }
}
