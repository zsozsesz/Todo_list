import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express/multer/interfaces';
import * as path from 'path';

@Injectable()
export class MulterOptionService  implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        return {
          dest: path.join(__dirname, '..', '..' , '..' , '/uploads'),
        };
    }
}
