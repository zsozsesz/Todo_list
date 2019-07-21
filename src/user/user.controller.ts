import { Controller, Get, UseGuards, SetMetadata, Request, Post, Body, Delete, Param, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MULTER_OPTIONS } from 'src/config/config';
import { AssignDto } from 'src/task/dto/assign.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

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

    @Put(':id')
    update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: number) {
        return this.userService.update(updateUserDto, id);
    }

    @Put('avatar/:id')
    @UseInterceptors(FileInterceptor('file', MULTER_OPTIONS))
    updateAvatar(@UploadedFile() file, @Param('id') id: number) {
        this.userService.updateAvatar(file, id);
    }

    @Post('unassign')
    unAssignTask(@Body() assignDto: AssignDto) {
        return this.userService.unAssignTask(assignDto);
    }
}
