import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  className: string;

  @Column('json')
  payload: string;

  @Column()
  aggregateId: string;

  @CreateDateColumn()
  createdAt: Date;
}
