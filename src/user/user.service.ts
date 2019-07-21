import { TaskService } from './../task/task.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import {getManager} from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly taskService: TaskService,
        ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({relations: ['Tasks']});
    }

    async createAndAssign(createTaskDto: CreateTaskDto, user: User): Promise<User> {
        const task  = await this.taskService.create(createTaskDto);
        user.tasks.push(task);
        return await this.userRepository.save(user);
    }

    async findAssignableTasks(user: User): Promise<any> {
        const sql = `SELECT t.* FROM task t LEFT JOIN user_task ut ON t.id = ut.task_id WHERE ut.user_id <> ${user.id} OR ut.user_id IS NULL`;
        const task = await getManager().query(sql);
        return task;
     }

     async delete(id: number) {
         await this.userRepository.delete(id);
         return 'deleted';
     }
}
