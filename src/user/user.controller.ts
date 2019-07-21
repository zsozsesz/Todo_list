
import { Controller, Get, UseGuards, SetMetadata, Request, Post, Body, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService,) {}

    @Get()
    @SetMetadata('roles', ['ADMIN'])
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('profile')
    @SetMetadata('roles', ['USER', 'ADMIN'])
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('create')
    @SetMetadata('roles', ['USER', 'ADMIN'])
    createAndAssign(@Body() createTaskDto: CreateTaskDto, @Request() req) {
      return this.userService.createAndAssign(createTaskDto, req.user);
    }

    @Get('assignable')
    @SetMetadata('roles', ['USER', 'ADMIN'])
    findAssignableTasks(@Request() req) {
        return this.userService.findAssignableTasks(req.user);
    }

    @Delete(':id')
    @SetMetadata('roles', ['ADMIN'])
    delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}
