import {
    IsNotEmpty,
    IsOptional,
    IsMobilePhone,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsOptional()
    @IsString()
    account_info: string;

    @IsOptional()
    @IsString()
    bio: string;

    @IsOptional()
    @IsString()
    avatar: string;
}
