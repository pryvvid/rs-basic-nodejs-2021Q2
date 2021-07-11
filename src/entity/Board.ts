import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'json', nullable: true })
  columns?: string;
}

export { Board };
