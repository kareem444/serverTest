import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    MaxLength,
    IsEmail,
} from 'class-validator';

export class CreateUserDto {
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsOptional()
    @IsString()
    avatar: string;

    createdAt: Date = new Date();
}
