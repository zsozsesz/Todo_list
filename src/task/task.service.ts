import { AssignToUserDto } from './dto/assign-to-user.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();
    return tasks;
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = await this.taskRepository.save(createTaskDto);
        return task;
    }

    async assignToUser(assignToUserDto: AssignToUserDto): Promise<any> {
        try {
            const task = await this.taskRepository.findOneOrFail(assignToUserDto.taskId, { relations: ['users'] });
            const user = await this.userRepository.findOneOrFail(assignToUserDto.userId);
            task.users.push(user);
            return await this.taskRepository.save(task);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
