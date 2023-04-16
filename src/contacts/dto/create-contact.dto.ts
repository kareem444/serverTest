import {
    IsNotEmpty,
    IsMobilePhone,
    IsString,
    MinLength,
    MaxLength,
    IsEmail,
    IsOptional

} from 'class-validator';

export class CreateContactDto {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)	
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsMobilePhone()	
    @MaxLength(12)
    phone:string
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(250)
    message:string

    createdAt: Date =new Date();

    
}
