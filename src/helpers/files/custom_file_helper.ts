import { EnumFileType } from '../enums/enum.values';
import { NotAcceptableException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export default class CustomFileHelper {
    static fileFullPath(file: Express.Multer.File): string | null {
        if (file) {
            return `/${file.path.split('\\').join('/')}`;
        }
    };

    static getFileType(file: Express.Multer.File): EnumFileType {
        if (file.mimetype.startsWith('image/')) {
            return EnumFileType.IMAGE
        } else if (file.mimetype.startsWith('video/')) {
            return EnumFileType.VIDEO
        } else if (file.mimetype.startsWith('audio/')) {
            return EnumFileType.AUDIO
        }
        else if (file.mimetype.startsWith('text/')) {
            return EnumFileType.TEXT
        }
        else if (file.mimetype == 'application/pdf') {
            return EnumFileType.PDF
        }
        throw new NotAcceptableException(`The ${file.mimetype} file is not acceptable`)
    };

    static generateFileName(file: Express.Multer.File): string {
        const name = file.originalname.split('.')[0].replace(/\s/g, '-');
        const fileExtName = extname(file.originalname);
        return `${name}-${uuidv4()}${fileExtName}`;
    };
}
