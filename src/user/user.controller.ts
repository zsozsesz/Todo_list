import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    @SetMetadata('roles', ['ADMIN'])
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
