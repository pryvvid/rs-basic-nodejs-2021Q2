import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from '../../entity/Board';
import { Task } from '../../entity/Task';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Task])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
