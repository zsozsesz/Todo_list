import { Task } from './../task/entities/task.entity';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from 'src/task/task.module';

@Module({
    imports: [TypeOrmModule.forFeature([User, Task]), TaskModule],
    providers: [UserService],
    controllers: [UserController],
  })
  export class UserModule {}
