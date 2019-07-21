import { Injectable, BadRequestException } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express/multer/interfaces';
import * as path from 'path';
import * as multer from 'multer';
@Injectable()
export class MulterOptionService  implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        return {
          storage: multer.diskStorage({
            destination: path.join(__dirname, '..', '..' , '..' , '/uploads'),
            filename: (req , file, cb) => {
              cb(null, `avatar-${Date.now()}`);
            },
          }),
          fileFilter: (req, file, cb) => {

              const filetypes = /jpeg|jpg|png/;
              const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
              const mimetype = filetypes.test(file.mimetype);

              if (mimetype && extname) {
                  return cb(null, true);
              } else {
                  cb(new BadRequestException(), false);
              }
          },
        };
    }
}
