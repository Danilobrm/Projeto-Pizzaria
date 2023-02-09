import crypto from 'crypto';
import multer from 'multer';

import { extname, resolve } from 'path';

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
      fileFilter: (request, file, callback) => {
        if (
          file.mimetype == 'image/png' ||
          file.mimetype == 'image/jpg' ||
          file.mimetype == 'image/jpeg'
        ) {
          return callback(null, true);
        }
        callback(null, false);
        return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
      },
    };
  },
};
