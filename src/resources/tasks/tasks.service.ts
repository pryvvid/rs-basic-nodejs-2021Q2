import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entity/Task';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: CreateTaskDto) {
    const task = new Task();
    task.title = title;
    task.order = order;
    task.description = description;
    task.userId = userId;
    task.boardId = boardId;
    task.columnId = columnId;
    await this.tasksRepository.save(task);
    return task;
  }

  async findAll() {
    const allTasks = await this.tasksRepository.find();
    return allTasks;
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findOne(id);
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const taskToUpdate = await this.tasksRepository.findOne(id);
    if (taskToUpdate) {
      const updatedTask = {
        ...taskToUpdate,
        ...updateTaskDto,
      };
      await this.tasksRepository.save(updatedTask);
      return updatedTask;
    }
    return undefined;
  }

  async remove(id: string) {
    const taskToRemove = await this.tasksRepository.findOne(id);
    if (taskToRemove) await this.tasksRepository.remove(taskToRemove);
  }
}
