import { Controller, Post, Body, Param, Put, Res, HttpStatus } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';
import { Response } from 'express';

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
        message: 'Permission created successfully'
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

}
