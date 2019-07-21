import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as path from 'path';
import { BadRequestException } from '@nestjs/common';

export const JWT_SECRET  =  'secret';
export const JWT_EXPIRESIN = '12h';
export const TYPEORM: TypeOrmModuleOptions =  {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'username',
    password: 'password',
    database: 'todo',
    entities: ['src/**/*.entity{.ts,.js}'],
    synchronize: true,
};

export const MULTER_OPTIONS = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
      }),
      fileFilter: (req, file, cb) => {

        const filetypes = /jpeg|jpg|png/;
        const ext = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && ext) {
            return cb(null, true);
        } else {
            cb(new BadRequestException(), false);
        }
      },
};
