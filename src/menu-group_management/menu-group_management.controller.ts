import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, Res, HttpException, HttpStatus } from '@nestjs/common';
import { MenuGroupManagementService } from './menu-group_management.service';
import { CreateMenuGroupManagementDto } from './dto/create-menu-group_management.dto';
import { UpdateMenuGroupManagementDto } from './dto/update-menu-group_management.dto';
import { Response } from 'express';
import { MESSAGE } from 'src/common/collection';

@Controller('menu-group')
export class MenuGroupManagementController {
  constructor(private readonly menuGroupManagementService: MenuGroupManagementService) { }

  @Post('add')
  async createMenuGroup(@Body() createMenuGroupManagementDto: CreateMenuGroupManagementDto, @Res() res: Response) {
    try {
      const menuGroupExists = await this.menuGroupManagementService.findMenuGroupByName(createMenuGroupManagementDto.name);
      if (menuGroupExists) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGE.WARNING.MENU_GROUP_ALREADY_EXISTS
        }, HttpStatus.BAD_REQUEST);
      }
      const newMenuGroup = await this.menuGroupManagementService.createMenuGroup(createMenuGroupManagementDto);
      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: MESSAGE.SUCCESS.MENU_GROUP_ADDED,
        data: { newMenuGroup }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('all')
  async findAllMenuGroups(@Res() res: Response) {
    try {
      const allMenuGroups = await this.menuGroupManagementService.findAllMenuGroups();
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.MENU_GROUPS_FETCHED,
        data: { allMenuGroups }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('get/:id')
  async findOneMenuGroup(@Param('id') id: string, @Res() res: Response) {
    try {
      const menuGroup = await this.menuGroupManagementService.findOneMenuGroup(id);
      if (!menuGroup) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.MENU_GROUP_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.MENU_GROUP_FETCHED,
        data: { menuGroup }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Put('update/:id')
  async updateOneMenuGroup(
    @Param('id') id: string,
    @Body() updateMenuGroupManagementDto: UpdateMenuGroupManagementDto,
    @Res() res: Response) {
    try {
      const menuGroup = await this.menuGroupManagementService.findOneMenuGroup(id);
      if (!menuGroup) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.MENU_GROUP_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      const updatedMenuGroup = await this.menuGroupManagementService.updateOneMenuGroup(id, updateMenuGroupManagementDto);
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.MENU_GROUP_UPDATED,
        data: { updatedMenuGroup }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Delete('delete/:id')
  async removeOneMenuGroup(@Param('id') id: string, @Res() res: Response) {
    try {
      const menuGroup = await this.menuGroupManagementService.findOneMenuGroup(id);
      if (!menuGroup) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.MENU_GROUP_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      await this.menuGroupManagementService.removeOneMenuGroup(id);
      res.status(HttpStatus.OK).json({
        data: {},
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.MENU_GROUP_DELETED,
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }
}