import { AssignToUserDto } from './dto/assign-to-user.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as moment from 'moment';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<Task[]> {
        const tasks = await this.taskRepository.find({relations: ['users'] });
        return tasks;
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        if (!moment(createTaskDto.startDate, 'YYYY-MM-DD', true).isValid() || !moment(createTaskDto.endDate, 'YYYY-MM-DD', true).isValid()) {
            throw new BadRequestException();
        }
        const task = await this.taskRepository.save(createTaskDto);
        return task;
    }

    async assignToUser(assignToUserDto: AssignToUserDto): Promise<Task> {
        try {
            const task = await this.taskRepository.findOneOrFail(assignToUserDto.taskId, { relations: ['users'] });
            const user = await this.userRepository.findOneOrFail(assignToUserDto.userId);
            task.users.push(user);
            return await this.taskRepository.save(task);
        } catch (error) {
            throw new NotFoundException();
        }
    }
    async findAssignableUsers(taskId: number): Promise<any> {
        const sql = `
            SELECT u.* FROM user u LEFT JOIN user_task ut ON u.id = ut.user_id WHERE ut.task_id <> ${taskId} OR ut.task_id IS NULL GROUP BY u.id
        `;
        const users: User[] = await getManager().query(sql);
        const response = users.map(user => {
            const {password, ...result} = user;
            return result;
        });
        return response;
     }

    async delete(id: number) {
        await this.taskRepository.delete(id);
        return 'deleted';
    }

    async update(createTaskDto: CreateTaskDto, id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);
        if (!task) {
            throw new NotFoundException();
        }
        task.name  = createTaskDto.name;
        task.description = createTaskDto.description;
        task.startDate = createTaskDto.startDate;
        task.endDate = createTaskDto.endDate;
        return this.taskRepository.save(task);
    }
}
