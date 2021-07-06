import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserToResponse } from '../common/types';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  static toResponse(user: User): UserToResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export { User };
