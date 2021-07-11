import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../../entity/Board';
import { Task } from '../../entity/Task';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create({ title, columns }: CreateBoardDto) {
    const board = new Board();
    board.title = title;
    board.columns = columns;
    await this.boardsRepository.save(board);
    return board;
  }

  async findAll() {
    const allBoards = await this.boardsRepository.find();
    return allBoards;
  }

  async findOne(id: string) {
    const board = await this.boardsRepository.findOne(id);
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const boardToUpdate = await this.boardsRepository.findOne(id);
    if (boardToUpdate) {
      const updatedBoard = { ...boardToUpdate, ...updateBoardDto };
      await this.boardsRepository.save(updatedBoard);
      return updatedBoard;
    }
    return undefined;
  }

  async remove(id: string) {
    await this.deleteTasksByBoardId(id);
    const boardToRemove = await this.boardsRepository.findOne(id);
    if (boardToRemove) await this.boardsRepository.remove(boardToRemove);
  }

  async deleteTasksByBoardId(boardId: string): Promise<void> {
    const tasksToRemove = await this.tasksRepository.find({
      where: { boardId },
    });
    if (tasksToRemove) {
      tasksToRemove.forEach(async (task) => {
        await this.tasksRepository.remove(task);
      });
    }
  }
}
