import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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
