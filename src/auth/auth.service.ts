import { CreateUserDto } from './../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly saltRounds = 10;

    constructor(
       @InjectRepository(User) private readonly userRepository: Repository<User>,
       private readonly jwtService: JwtService,
      ) {}

      async validateUser(id: string): Promise<any> {
        const user = await this.userRepository.findOne(id, {relations: ['tasks']});
        if (user) {
          return user;
        }
        return null;
      }

      async login(loginDTo: LoginDto) {
          try {
            const user = await this.userRepository.findOneOrFail({email: loginDTo.email});
            const {password, ...result} = user;
            if (bcrypt.compareSync(loginDTo.password, password)) {
              return {
                user: result,
                access_token: this.jwtService.sign(result),
               };
            }
            throw new UnauthorizedException();
          } catch (error) {
            throw new UnauthorizedException();
          }
      }

      async create(createUserDto: CreateUserDto, file) {
        const { name, confirmPassword, email, role} = createUserDto;
        let { password } = createUserDto;

        const avatar = file ? file.filename : 'avatar';
        if (password === confirmPassword && !await this.userRepository.findOne({email})) {
            password = await bcrypt.hash(password, this.saltRounds);
            const user = await this.userRepository.save({name, password, email, avatar, role});
            const payload = {
                email:  user.email,
                id: user.id,
                role: user.role,
            };
            return {
                user: payload,
                access_token: this.jwtService.sign(payload),
               };
        }

        throw new ConflictException();
    }
}
