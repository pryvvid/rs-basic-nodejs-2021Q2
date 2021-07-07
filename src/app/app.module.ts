import { Module } from '@nestjs/common';
import { User } from '../entity/User';
import { Board } from '../entity/Board';
import { Task } from '../entity/Task';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../resources/users/users.module';
import { BoardsModule } from '../resources/boards/boards.module';
import { TasksModule } from '../resources/tasks/tasks.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from '../filters/exception.filter';
import { LoginModule } from 'src/resources/login/login.module';
import { AuthGuard } from '../guards/auth.guard';

// TODO: change typeORM config with env const
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, Board, Task],
      synchronize: true,
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
    LoginModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
