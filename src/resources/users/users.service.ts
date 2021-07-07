import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../entity/User';
import { Task } from '../../entity/Task';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create({ name, login, password }: CreateUserDto) {
    const user = new User();
    user.name = name;
    user.login = login;
    user.password = password;
    // const hashedPassword = await bcrypt.hash(password, 10);
    // user.password = hashedPassword;
    await this.usersRepository.save(user);
    return User.toResponse(user);
  }

  async findAll() {
    const allUsers = await this.usersRepository.find();
    return allUsers.map(User.toResponse);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) return undefined;
    return User.toResponse(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.usersRepository.findOne(id);
    if (userToUpdate) {
      const updatedUser = { ...userToUpdate, ...updateUserDto };
      await this.usersRepository.save(updatedUser);
      return updatedUser;
    }
    return undefined;
  }

  async remove(id: string) {
    await this.setUserIdToNull(id);
    const userToRemove = await this.usersRepository.findOne(id);
    if (userToRemove) {
      await this.usersRepository.remove(userToRemove);
    }
  }

  async setUserIdToNull(userId: string): Promise<void> {
    const tasks = await this.tasksRepository.find({
      where: { userId },
    });
    if (tasks) {
      const updatedTasks = tasks.map((task) => ({ ...task, userId: null }));
      updatedTasks.forEach(async (taskToSave) => {
        await this.tasksRepository.save(taskToSave);
      });
    }
  }
}
