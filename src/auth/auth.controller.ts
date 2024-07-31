import { Controller, Post, Body, HttpException, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() body: { email: string; password: string }, @Res() res: Response) {
    try {
      const user = await this.authService.register(body.email, body.password);
      res.status(HttpStatus.CREATED).json({
        data: { user },
        status: HttpStatus.CREATED,
        message: 'User created successfully'
      })
    } catch (error: any) {
      console.log('error: ', error);
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res: Response) {
    try {
      const token = await this.authService.login(body.email, body.password);
      res.status(HttpStatus.CREATED).json({
        data: { token },
        status: HttpStatus.CREATED,
        message: 'User created successfully'
      })
    } catch (error) {
      console.log('login error: ', error.response);
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }
}
