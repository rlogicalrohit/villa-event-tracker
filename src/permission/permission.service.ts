import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async createPermission(name: string): Promise<Permission> {
    const permission = this.permissionRepository.create({ name });
    return await this.permissionRepository.save(permission);
  }

  // async addRolesToPermission(permissionId: number, roleIds: number[]): Promise<Permission> {
  //   const permission = await this.permissionRepository.findOne({
  //     where: { id: permissionId },
  //     relations: ['roles'],
  //   });

  //   if (!permission) {
  //     throw new Error('Permission not found');
  //   }

  //   const roles = await this.roleRepository.find({
  //     where: {
  //       id: In(roleIds),
  //     },
  //   });

  //   permission.roles = roles;
  //   return await this.permissionRepository.save(permission);
  // }
}
