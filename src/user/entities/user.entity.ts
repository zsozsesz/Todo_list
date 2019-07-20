import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import { Task } from 'src/task/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 , unique: true})
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column()
  avatar: string;

  @Column({default: 'USER'})
  role: string;

  @ManyToMany(type => Task)
  @JoinTable({
      name: 'user_task' ,
      joinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
      },
      inverseJoinColumn: {
          name: 'task_id',
          referencedColumnName: 'id',
      },
  })
  tasks: Task[];
}
