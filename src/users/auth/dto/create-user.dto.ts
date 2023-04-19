import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    MaxLength,
    IsEmail,
} from 'class-validator';
import { UserRole } from 'src/helpers/enums/enum.values';

export class CreateUserDto {
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, default: "kareem", name: "name" })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ type: String, default: "kareem963221@gmail.com", name: "email" })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @ApiProperty({ type: String, default: "12345678", name: "password" })
    password: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: String, default: UserRole.ADMIN, name: "role", required: false })
    role: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, default: null, name: "avatar", required: false })
    avatar?: string;

    createdAt: Date = new Date();
}
