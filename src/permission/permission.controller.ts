import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';
import { Response } from 'express';
import { MESSAGE } from 'src/common/collection';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Post()
  async createPermission(@Body() body: { name: string, label: string }, @Res() res: Response) {
    try {
      const permission = this.permissionService.createPermission(body.name, body.label);
      res.status(HttpStatus.CREATED).json({
        data: { permission },
        status: HttpStatus.CREATED,
        message: MESSAGE.SUCCESS.PERMISSION_CREATED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
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
