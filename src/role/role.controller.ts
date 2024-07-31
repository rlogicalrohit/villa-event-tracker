import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() body: { name: string }): Promise<Role> {
    return this.roleService.createRole(body.name);
  }

  @Put(':roleId/permissions')
  async addPermissions(@Param('roleId') roleId: number, @Body() body: { permissionIds: number[] }): Promise<Role> {
    return this.roleService.addPermissionsToRole(roleId, body.permissionIds);
  }
}
