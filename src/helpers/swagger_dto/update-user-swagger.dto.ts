import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserSwaggerDto {
    @ApiProperty({ type: String, format: 'binary', required: false })
    file: Express.Multer.File;

    @ApiProperty({ type: String, name: "name", required: false })
    name: string;

    @ApiProperty({ type: String, name: "email", required: false })
    email: string;

    @ApiProperty({ type: String, name: "role", required: false })
    role: string;

    updatedAt: Date = new Date();
}
