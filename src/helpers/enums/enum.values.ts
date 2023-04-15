export enum EnumFileType {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    PDF = "PDF"
}

export enum EnumUploadedOptions {
    FIELD_NAME = "fieldname",
    ORIGINAL_NAME = "originalname",
    ENCODING = "encoding",
    MIME_TYPE = "mimetype",
    DESTINATION = "destination",
    FILE_NAME = "filename",
    PATH = "path",
    SIZE = "size",
    FILE_TYPE = "fileType",
    FULL_PATH = "fullPath",
    BUFFER = "buffer"
}

export enum UserRole {
    ADMIN = "ADMIN",
    SELLER = "SELLER"
}

export enum EnumStatues {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    CANCELED = 'CANCELED',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    UNKNOWN = 'UNKNOWN'
}

export enum EnumUploadFilesStorage {
    LOCAL = 'LOCAL',
    S3 = 'S3',
    GCP = 'GCP',
    AZURE = 'AZURE',
    DO = 'DO'
}