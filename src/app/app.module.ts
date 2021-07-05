import { Module } from '@nestjs/common';
import { User } from '../entity/User';
import { Board } from '../entity/Board';
import { Task } from '../entity/Task';
// import { UsersController } from '../resources/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../resources/users/users.module';
import { BoardsModule } from '../resources/boards/boards.module';
import { TasksModule } from '../resources/tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'n1957',
      database: 'postgres',
      entities: [User, Board, Task],
      synchronize: true,
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
