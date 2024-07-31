import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) { }

  async createRole(name: string): Promise<Role> {
    const role = this.roleRepository.create({ name });
    return await this.roleRepository.save(role);
  }

  async addPermissionsToRole(roleId: number, permissionIds: number[]): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (!role) {
      throw new Error('Role not found');
    }

    const permissions = await this.permissionRepository.find({
      where: {
        id: In(permissionIds),
      },
    });

    role.permissions = permissions;
    return await this.roleRepository.save(role);
  }
}
