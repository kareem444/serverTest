import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    //     const request = context.switchToHttp().getRequest<Request>();
    //     const response: Response = context.switchToHttp().getResponse<Response>();

    //     if (err || !user) {
    //         // Redirect to login page
    //         // response.redirect('http://127.0.0.1:3000/auth/login');
    //     }

    //     return user;
    // }
}