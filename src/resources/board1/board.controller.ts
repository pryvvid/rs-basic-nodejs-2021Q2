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

@Controller('boards')
export class BoardController {
  @Get()
  getBoards() {
    return 'All boards';
  }

  @Get('/:id')
  getBoardById(@Param('id') id) {
    return `Get board by id ${id}`;
  }

  @Post()
  createBoard(@Body() body, @Req() _req: Request, @Res() res: Response) {
    return res.status(200).json(body);
  }

  @Put('/:id')
  updateBoard(@Param('id') id: string, @Body() body) {
    return `Update board by id ${id} with body ${body}`;
  }
}
