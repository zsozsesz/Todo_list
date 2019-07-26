import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as express from 'express';
import * as path from 'path';
//startpoint
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(express.static(path.join(__dirname, '..' , 'view')));
  app.use('/static', express.static(path.join(__dirname, '..', 'uploads')));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
