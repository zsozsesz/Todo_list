import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

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
}
