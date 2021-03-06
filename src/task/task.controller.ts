import { AssignDto } from './dto/assign.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { Controller, Get, Body, Post, UseGuards, SetMetadata, Param, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@SetMetadata('roles', ['ADMIN'])
@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) {}

    @Get()
    findAll(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    @Post('assign')
    assignToUser(@Body() assignDto: AssignDto) {
       return this.taskService.assignToUser(assignDto);
    }

    @Get('free/:id')
    findAssignableUsers(@Param('id') id: number) {
        return this.taskService.findAssignableUsers(id);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.taskService.delete(id);
    }

    @Put(':id')
    update(@Body() createTaskDto: CreateTaskDto, @Param('id') id: number) {
        return this.taskService.update(createTaskDto, id);
    }

    @Post('unassign')
    unAssignUser(@Body() assignDto: AssignDto) {
        return this.taskService.unAssignUser(assignDto);
    }
}
