import { Controller, Post, Body, Param, Put, Get, Res, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { Response } from 'express';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  async createRole(@Body() body: { name: string, permissionIds: number[] }, @Res() res: Response) {
    try {
      const role = await this.roleService.createRole(body.name, body.permissionIds);
      res.status(HttpStatus.CREATED).json({
        data: { role }, status: HttpStatus.CREATED, message: 'Role created successfully'
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('all')
  async allRoles(@Res() res: Response) {
    try {
      const allRoles = await this.roleService.allRoles();
      res.status(HttpStatus.OK).json({
        data: { allRoles }, status: HttpStatus.CREATED, message: 'All roles retrieved successfully'
      })
    } catch (error) {
      console.log('RoleController allRoles [error] : ', error);
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Put(':roleId/permissions')
  async addPermissions(@Param('roleId') roleId: number, @Body() body: { permissionIds: number[] }, @Res() res: Response) {
    try {
      const role = this.roleService.addPermissionsToExistingRole(roleId, body.permissionIds);
      res.status(HttpStatus.OK).json({
        data: { role }, status: HttpStatus.OK, message: 'Role Updated and Permissions added successfully'
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }
}
