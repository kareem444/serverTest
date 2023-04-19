import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsMobilePhone,
    IsString,
    MinLength,
    MaxLength,
    IsEmail,
    IsOptional,
} from 'class-validator';

export class CreateContactDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({ type: String, default: "kareem", name: "name" })
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ type: String, default: "kareem963221@gmail.com", name: "email" })
    email: string;

    @IsOptional()
    @IsMobilePhone()
    @MaxLength(12)
    @ApiProperty({ type: String, default: "01022564374", name: "phone", required: false })
    phone: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(250)
    @ApiProperty({ type: String, default: "This is default message from contact", name: "message" })
    message: string

    createdAt: Date = new Date();
}
