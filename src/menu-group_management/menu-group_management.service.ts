import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuGroupManagement } from './entities/menu-group_management.entity';
import { CreateMenuGroupManagementDto } from './dto/create-menu-group_management.dto';
import { UpdateMenuGroupManagementDto } from './dto/update-menu-group_management.dto';
import { MESSAGE } from 'src/common/collection';

@Injectable()
export class MenuGroupManagementService {
  constructor(
    @InjectRepository(MenuGroupManagement)
    private readonly menuGroupManagementRepository: Repository<MenuGroupManagement>,
  ) { }

  async createMenuGroup(createMenuGroupManagementDto: CreateMenuGroupManagementDto): Promise<MenuGroupManagement> {
    try {
      const menuGroupExists = await this.findMenuGroupByName(createMenuGroupManagementDto.name);
      if (menuGroupExists) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGE.WARNING.MENU_GROUP_ALREADY_EXISTS
        }, HttpStatus.BAD_REQUEST);
      }
      const newMenuGroup = this.menuGroupManagementRepository.create(createMenuGroupManagementDto);
      return await this.menuGroupManagementRepository.save(newMenuGroup);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllMenuGroups(): Promise<MenuGroupManagement[]> {
    try {
      return await this.menuGroupManagementRepository.find();
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneMenuGroup(id: string): Promise<MenuGroupManagement> {
    try {
      const menuGroup = await this.menuGroupManagementRepository.findOne({ where: { id } });
      if (!menuGroup) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.MENU_GROUP_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      return menuGroup;
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOneMenuGroup(id: string, updateMenuGroupManagementDto: UpdateMenuGroupManagementDto): Promise<MenuGroupManagement> {
    try {
      const menuGroup = await this.findOneMenuGroup(id);
      if (!menuGroup) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.MENU_GROUP_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      await this.menuGroupManagementRepository.update(id, updateMenuGroupManagementDto);
      return await this.menuGroupManagementRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeOneMenuGroup(id: string): Promise<void> {
    try {
      const menuGroup = await this.findOneMenuGroup(id);
      if (!menuGroup) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.MENU_GROUP_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      await this.menuGroupManagementRepository.delete(id);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findMenuGroupByName(name: string): Promise<MenuGroupManagement> {
    try {
      return await this.menuGroupManagementRepository.findOne({ where: { name } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
