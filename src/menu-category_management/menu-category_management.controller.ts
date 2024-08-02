import { Controller, Get, Post, Body, Param, Delete, Res, HttpException, HttpStatus, Put } from '@nestjs/common';
import { MenuCategoryManagementService } from './menu-category_management.service';
import { CreateMenuCategoryManagementDto } from './dto/create-menu-category_management.dto';
import { UpdateMenuCategoryManagementDto } from './dto/update-menu-category_management.dto';
import { Response } from 'express';
import { MESSAGE } from 'src/common/collection';

@Controller('menu-category')
export class MenuCategoryManagementController {
  constructor(private readonly menuCategoryManagementService: MenuCategoryManagementService) { }

  @Post('add')
  async createMenuCategory(@Body() createMenuCategoryManagementDto: CreateMenuCategoryManagementDto, @Res() res: Response) {
    try {
      const newMenuCategory = await this.menuCategoryManagementService.createMenuCategory(createMenuCategoryManagementDto);
      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: MESSAGE.SUCCESS.MENU_CATEGORY_ADDED,
        data: { newMenuCategory }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('all')
  async findAllMenuCategorys(@Res() res: Response) {
    try {
      const allMenuCategorys = await this.menuCategoryManagementService.findAllMenuCategorys();
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.MENU_CATEGORIES_FETCHED,
        data: { allMenuCategorys }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('get/:id')
  async findOneMenuCategory(@Param('id') id: string, @Res() res: Response) {
    try {
      const menuCategory = await this.menuCategoryManagementService.findOneMenuCategory(id);
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.MENU_CATEGORY_FETCHED,
        data: { menuCategory }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Put('update/:id')
  async updateOneMenuCategory(
    @Param('id') id: string,
    @Body() updateMenuCategoryManagementDto: UpdateMenuCategoryManagementDto,
    @Res() res: Response) {
    try {
      const updatedMenuCategory = await this.menuCategoryManagementService.updateOneMenuCategory(id, updateMenuCategoryManagementDto);
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.MENU_CATEGORY_UPDATED,
        data: { updatedMenuCategory }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Delete('delete/:id')
  async removeOneMenuCategory(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.menuCategoryManagementService.removeOneMenuCategory(id);
      res.status(HttpStatus.OK).json({
        data: {},
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.MENU_CATEGORY_DELETED,
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }
}
