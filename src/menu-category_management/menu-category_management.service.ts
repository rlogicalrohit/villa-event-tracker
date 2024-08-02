import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuCategoryManagementDto } from './dto/create-menu-category_management.dto';
import { UpdateMenuCategoryManagementDto } from './dto/update-menu-category_management.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuCategoryManagement } from './entities/menu-category_management.entity';
import { Repository } from 'typeorm';
import { MESSAGE } from 'src/common/collection';

@Injectable()
export class MenuCategoryManagementService {
  constructor(
    @InjectRepository(MenuCategoryManagement)
    private readonly menuCategoryManagementRepository: Repository<MenuCategoryManagement>,
  ) { }

  async createMenuCategory(createMenuCategoryManagementDto: CreateMenuCategoryManagementDto): Promise<MenuCategoryManagement> {
    try {
      const menuCategoryExists = await this.findMenuCategoryByName(createMenuCategoryManagementDto.name);
      if (menuCategoryExists) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGE.WARNING.MENU_CATEGORY_ALREADY_EXISTS
        }, HttpStatus.BAD_REQUEST);
      }
      const newMenuCategory = this.menuCategoryManagementRepository.create(createMenuCategoryManagementDto);
      return await this.menuCategoryManagementRepository.save(newMenuCategory);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllMenuCategorys(): Promise<MenuCategoryManagement[]> {
    try {
      return await this.menuCategoryManagementRepository.find();
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneMenuCategory(id: string): Promise<MenuCategoryManagement> {
    try {
      const menuCategory = await this.menuCategoryManagementRepository.findOne({ where: { id } });
      if (!menuCategory) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.MENU_CATEGORY_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      return menuCategory
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOneMenuCategory(id: string, updateMenuCategoryManagementDto: UpdateMenuCategoryManagementDto): Promise<MenuCategoryManagement> {
    try {
      const menuCategory = await this.findOneMenuCategory(id);
      if (!menuCategory) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.MENU_CATEGORY_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      await this.menuCategoryManagementRepository.update(id, updateMenuCategoryManagementDto);
      return await this.menuCategoryManagementRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeOneMenuCategory(id: string): Promise<void> {
    try {
      const menuCategory = await this.findOneMenuCategory(id);
      if (!menuCategory) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.MENU_CATEGORY_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      await this.menuCategoryManagementRepository.delete(id);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findMenuCategoryByName(name: string): Promise<MenuCategoryManagement> {
    try {
      return await this.menuCategoryManagementRepository.findOne({ where: { name } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
