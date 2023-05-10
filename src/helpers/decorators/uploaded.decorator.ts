import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import CustomFileHelper from '../files/custom_file_helper';
import {
    EnumUploadedOptions,
    EnumUploadFilesStorage,
} from '../enums/enum.values';
import { uploadToS3 } from '../files/s3_upload_helper';

interface decoratorOption {
    option?: EnumUploadedOptions | string;
    storage?: EnumUploadFilesStorage;
}

export const Uploaded = createParamDecorator(
    async (data: decoratorOption, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const file: Express.Multer.File = request.file;

        if (!file) {
            return null;
        }

        file[EnumUploadedOptions.FILE_TYPE] = CustomFileHelper.getFileType(file);
        if (file.path) {
            file[EnumUploadedOptions.FULL_PATH] = CustomFileHelper.fileFullPath(file);
        }

        if (
            data?.storage !== null &&
            data?.storage !== EnumUploadFilesStorage.LOCAL
        ) {
            await uploadToS3(file).then(
                (data) =>
                (file[EnumUploadedOptions.FULL_PATH] =
                    process.env.AWS_S3_MAIN_FILE_STORAGE_PATH + file.originalname),
            );
        }

        return data?.option ? file?.[data.option] : file;
    },
);
