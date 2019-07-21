import { CreateUserDto } from './dto/create-user.dto';
import { TaskService } from './../task/task.service';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import {getManager} from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssignDto } from 'src/task/dto/assign.dto';

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
        const sql = `
        SELECT t.* FROM task t LEFT JOIN user_task ut ON t.id = ut.task_id WHERE ut.user_id <> ${user.id} OR ut.user_id IS NULL GROUP BY t.id
        `;
        const task = await getManager().query(sql);
        return task;
     }

     async delete(id: number) {
         await this.userRepository.delete(id);
         return 'deleted';
     }

     async update(updateUserDto: UpdateUserDto, id: number): Promise<User> {
         const check = await this.userRepository.findOne({
             where: [
                 {email: updateUserDto.email},
                 {id:  Not(id)},
             ],
         });
         if (check) {
             throw new ConflictException();
         }

         const user = await this.userRepository.findOne(id);
         user.email = updateUserDto.email ? updateUserDto.email : user.email;
         user.name = updateUserDto.name ? updateUserDto.name : user.name;
         user.role = updateUserDto.role ? updateUserDto.role : user.role;
         return await this.userRepository.save(user);
    }

    async updateAvatar(file, id: number): Promise<User> {
        const avatar = file ? file.filename : 'avatar';
        const user = await this.userRepository.findOne(id);
        user.avatar = avatar;
        return await this.userRepository.save(user);
    }

    async unAssignTask(assignDto: AssignDto): Promise<User> {
        try {
            const user = await this.userRepository.findOneOrFail(assignDto.userId, { relations: ['tasks'] });
            user.tasks =  user.tasks.filter((task) => {
                return task.id !== assignDto.taskId;
            });
            return await this.userRepository.save(user);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
