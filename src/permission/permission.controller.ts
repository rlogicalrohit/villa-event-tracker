import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';
import { Response } from 'express';
import { MESSAGE } from 'src/common/collection';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Post()
  async createPermission(@Body() body: CreatePermissionDto, @Res() res: Response) {
    try {
      const permission = await this.permissionService.createPermission(body.name, body.label);
      res.status(HttpStatus.CREATED).json({
        data: { permission },
        status: HttpStatus.CREATED,
        message: MESSAGE.SUCCESS.PERMISSION_CREATED
      })
    } catch (error) {
      console.log('error: ', error);
      res.status(error.status).json({
        error: (error.response.error ? error.response.error : error.response),
        status: error.status
      })
    }
  }

  @Get('all')
  async getAllPermissions(@Res() res: Response) {
    try {
      const permissions = await this.permissionService.getAllPermissions();
      res.status(HttpStatus.OK).json({
        data: { permissions },
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.ALL_PERMISSIONS_FETCHED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }
}
