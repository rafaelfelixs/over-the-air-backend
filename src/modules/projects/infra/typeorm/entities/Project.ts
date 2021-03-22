// import { v4 as uuid } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  creator_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator?: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /* constructor({ creator, date }: Omit<Project, 'id'>) {
    this.id = uuid();
    this.creator = creator;
    this.date = date;
  } */
}

export default Project;
