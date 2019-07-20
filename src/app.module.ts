import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { TYPEORM } from './config/config';
import { MulterOptionService } from './common/multer-option/multer-option.service';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [TypeOrmModule.forRoot(TYPEORM), UserModule, TaskModule, AuthModule,
    MulterModule.registerAsync({
      useClass: MulterOptionService,
    }),
  ],
  controllers: [],
  providers: [MulterOptionService],
})
export class AppModule {}
