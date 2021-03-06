import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { TYPEORM } from './config/config';

@Module({
  imports: [TypeOrmModule.forRoot(TYPEORM), UserModule, TaskModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
