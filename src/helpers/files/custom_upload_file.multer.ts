import { diskStorage } from 'multer'
import { EnumFileType, EnumUploadFilesStorage } from '../enums/enum.values'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { FileInterceptor } from '@nestjs/platform-express'
import { Type, NestInterceptor, NotAcceptableException } from '@nestjs/common'
import CustomFileHelper from './custom_file_helper'

export default function CustomUploadFile(
    options: UploadFileOptions = {},
): Type<NestInterceptor> {
    options = {
        storage: EnumUploadFilesStorage.S3,
        mainDir: 'uploads',
        path: 'public',
        fieldName: 'file',
        maxSize: 20 * 1024 * 1024, // 20 mg
        ...options,
    }
    if (options.storage == EnumUploadFilesStorage.LOCAL) {
        return FileInterceptor(
            options.fieldName,
            handleUploadFileToLocalOptions(options),
        )
    }
    return FileInterceptor(options.fieldName, handleUploadFileOptions(options))
}

interface UploadFileOptions {
    storage?: EnumUploadFilesStorage
    fieldName?: string
    path?: string
    type?: EnumFileType
    mainDir?: string
    maxSize?: number
}

const handleUploadFileOptions = (options: UploadFileOptions): MulterOptions => {
    const { path, type, mainDir, maxSize } = options
    return {
        limits: {
            fileSize: maxSize,
        },
        fileFilter: (req, file: Express.Multer.File, callback) => {
            file.originalname = `${path}/${type != null
                    ? +type.toLowerCase()
                    : CustomFileHelper.getFileType(file).toLowerCase()
                }/${CustomFileHelper.generateFileName(file)}`
            return fileFilter(req, type, file, callback)
        },
    }
}

const handleUploadFileToLocalOptions = (
    options: UploadFileOptions,
): MulterOptions => {
    const { path, type, mainDir } = options
    return {
        storage: diskStorage({
            destination: `./${mainDir}/${path}${type != null ? '/' + type.toLowerCase() : ''
                }`,
            filename: (req, file: Express.Multer.File, callback) => {
                callback(null, CustomFileHelper.generateFileName(file))
            },
        }),
        ...handleUploadFileOptions(options),
    }
}

const fileFilter = (
    req,
    type: EnumFileType,
    file: Express.Multer.File,
    callback,
) => {
    if (type == EnumFileType.IMAGE || file.mimetype.startsWith('image/')) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG|GIF|gif)$/)) {
            return callback(
                new NotAcceptableException('Only image files are allowed!'),
                false,
            )
        }
        return callback(null, true)
    } else if (type == EnumFileType.VIDEO || file.mimetype.startsWith('video/')) {
        if (!file.originalname.match(/\.(mp4|avi|flv|3gp|MP4|AVI|FLV|3GP)$/)) {
            return callback(
                new NotAcceptableException('Only video files are allowed!'),
                false,
            )
        }
        return callback(null, true)
    } else if (type == EnumFileType.AUDIO || file.mimetype.startsWith('audio/')) {
        if (!file.originalname.match(/\.(mp3|wav|MP3|WAV)$/)) {
            return callback(
                new NotAcceptableException('Only audio files are allowed!'),
                false,
            )
        }
        return callback(null, true)
    } else if (type == EnumFileType.TEXT || file.mimetype.startsWith('text/')) {
        if (!file.originalname.match(/\.(txt|doc|docx|TXT|DOC|DOCX)$/)) {
            return callback(
                new NotAcceptableException('Only text files are allowed!'),
                false,
            )
        }
        return callback(null, true)
    } else if (type == EnumFileType.PDF || file.mimetype == 'application/pdf') {
        if (!file.originalname.match(/\.(pdf|PDF)$/)) {
            return callback(
                new NotAcceptableException('Only PDF files are allowed!'),
                false,
            )
        }
        return callback(null, true)
    }
    return callback(
        new NotAcceptableException(`The ${file.mimetype} file is not acceptable`),
        false,
    )
}
