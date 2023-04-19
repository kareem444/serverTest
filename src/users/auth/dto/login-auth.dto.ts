import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class LoginAuthDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ type: String, default: "kareem963221@gmail.com", name: "email" })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @ApiProperty({ type: String, default: "12345678", name: "password" })
    password: string;
}
