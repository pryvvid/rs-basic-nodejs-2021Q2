import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from './config';

import { User } from '../entity/User';
import { Board } from '../entity/Board';
import { Task } from '../entity/Task';

export default {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT, 10),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [User, Board, Task],
  migrations: ['../migration/**/*.ts'],
  subscribers: ['../subscriber/**/*.ts'],
  cli: {
    entitiesDir: '../entity',
    migrationsDir: '../migration',
    subscribersDir: '../subscriber',
  },
};
