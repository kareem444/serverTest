import { IsString, IsNotEmpty, MinLength, IsPhoneNumber } from 'class-validator';

export class LoginAuthDto {
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string
}
