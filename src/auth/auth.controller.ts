import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { MULTER_OPTIONS } from 'src/config/config';
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService ) {}

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    @UseInterceptors(FileInterceptor('file', MULTER_OPTIONS))
    create(@UploadedFile() file, @Body() createUserDto: CreateUserDto) {
      return this.authService.create(createUserDto, file);
    }
}
