import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from 'src/users/auth/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: LoginAuthDto, @Res() res: Response) {
        return await this.authService.login(body, res);
    }

    @Post('register')
    async register(@Body() body: CreateUserDto, @Res() res: Response) {
        return await this.authService.register(body, res);
    }
}
