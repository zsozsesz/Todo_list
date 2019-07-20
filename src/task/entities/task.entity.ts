import { User } from './../../user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('datetime')
  startDate: Date;

  @Column('datetime')
  endDate: Date;

  @ManyToMany(type => User)
  @JoinTable({
      name: 'user_task' ,
      joinColumn: {
          name: 'task_id',
          referencedColumnName: 'id',
      },
      inverseJoinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
      },
  })
  users: User[];

}
