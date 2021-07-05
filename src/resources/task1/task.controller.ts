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

@Controller('boards/:boardId/tasks')
export class TaskController {
  @Get()
  getTasks() {
    return 'All Tasks';
  }

  @Get('/:id')
  getTaskById(@Param() params: { id: string; boardId: string }) {
    return `Get Task by id ${params.id}. Board id ${params.boardId}`;
  }

  @Post()
  createTask(@Body() body, @Req() _req: Request, @Res() res: Response) {
    return res.status(200).json(body);
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Param('boardId') boardId: string,
    @Body() body,
  ) {
    return `Update Task by id ${id} of Board id ${boardId} with body ${body}`;
  }
}
