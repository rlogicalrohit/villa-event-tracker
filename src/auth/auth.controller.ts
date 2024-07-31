import { Controller, Post, Body, Res, HttpStatus, Param, Put, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { Permissions } from './permission.decorator';
import { PermissionsGuard } from './permission.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async registerUser(@Body() body: { email: string; password: string, roleId: number }, @Res() res: Response) {
    try {
      const user = await this.authService.register(body.email, body.password, body.roleId);
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
  async loginUser(@Body() body: { email: string; password: string }, @Res() res: Response) {
    try {
      const token = await this.authService.login(body.email, body.password);
      res.status(HttpStatus.CREATED).json({
        data: { token },
        status: HttpStatus.CREATED,
        message: 'User login successfully'
      })
    } catch (error) {
      console.log('login error: ', error.response);
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Put('user/:userId/role')
  async updateUserRole(
    @Param('userId') userId: number,
    @Body('roleId') roleId: number,
    @Res() res: Response) {
    try {
      const user = this.authService.updateUserRole(userId, roleId);
      res.status(HttpStatus.CREATED).json({
        data: { user },
        status: HttpStatus.CREATED,
        message: 'User role updated successfully'
      })
    } catch (error) {
      console.log('updateUserRole error: ', error.response);
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('users')
  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions('GET_USERS')
  async getUsers(@Res() res: Response) {
    try {
      const users = await this.authService.allUsers();
      res.status(HttpStatus.CREATED).json({
        data: { users },
        status: HttpStatus.CREATED,
        message: 'Users fetched successfully'
      })
    } catch (error) {
      console.log('getUsers error: ', error.response);
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }
}
