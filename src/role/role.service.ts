import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async createRole(name: string, permissionIds: any): Promise<Role> {
    try {
      const permissions = await this.permissionRepository.find({
        where: {
          id: In(permissionIds),
        },
      });
      const role = this.roleRepository.create({ name, permissions });
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.response.error,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addPermissionsToExistingRole(roleId: number, permissionIds: number[]): Promise<Role> {
    try {
      const role = await this.roleRepository.findOne({
        where: { id: roleId },
        relations: ['permissions'],
      });
      if (!role) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'role not found',
        }, HttpStatus.BAD_REQUEST);
      }
      const permissions = await this.permissionRepository.find({
        where: {
          id: In(permissionIds),
        },
      });
      role.permissions = permissions;
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.response.error,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findRoleById(id: number): Promise<Role> {
    try {
      return await this.roleRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.response.error,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findRoleByName(name: string): Promise<Role> {
    try {
      return await this.roleRepository.findOne({ where: { name } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.response.error,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async allRoles(): Promise<Role[]> {
    try {
      return await this.roleRepository.find({
        relations: {
          permissions: true
        }
      })
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.response.error,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
