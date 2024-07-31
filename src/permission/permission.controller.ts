import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Post()
  async createPermission(@Body() body: { name: string }): Promise<Permission> {
    return this.permissionService.createPermission(body.name);
  }

  // @Put(':permissionId/roles')
  // async addRoles(@Param('permissionId') permissionId: number, @Body() body: { roleIds: number[] }): Promise<Permission> {
  //   return this.permissionService.addRolesToPermission(permissionId, body.roleIds);
  // }
}
