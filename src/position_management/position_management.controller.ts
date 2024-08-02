// position-management.controller.ts

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { PositionManagementService } from './position_management.service';
import { CreatePositionManagementDto } from './dto/create-position_management.dto';
import { UpdatePositionManagementDto } from './dto/update-position_management.dto';
import { MESSAGE } from 'src/common/collection';
import { Response } from 'express';

@Controller('position')
export class PositionManagementController {
  constructor(private readonly positionService: PositionManagementService) { }

  @Post('add')
  async createPosition(@Body() createDto: CreatePositionManagementDto, @Res() res: Response) {
    try {
      const positionData = await this.positionService.createPosition(createDto);
      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: MESSAGE.SUCCESS.POSITION_ADDED,
        data: { positionData }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('all')
  async findAll(@Res() res: Response) {
    try {
      const allPositions = await this.positionService.findAllPositions();
      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: MESSAGE.SUCCESS.POSITIONS_FETCHED,
        data: { allPositions }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('get/:id')
  async findOnePosition(@Param('id') id: string, @Res() res: Response) {
    try {
      const positionData = await this.positionService.findOnePosition(id);
      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: MESSAGE.SUCCESS.POSITION_FETCHED,
        data: { positionData }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Put('update/:id')
  async updateOnePosition(
    @Param('id') id: string,
    @Body() updateDto: UpdatePositionManagementDto,
    @Res() res: Response) {
    try {
      const updatedPositionData = await this.positionService.updateOnePosition(id, updateDto);
      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: MESSAGE.SUCCESS.POSITION_UPDATED,
        data: { updatedPositionData }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Delete('delete/:id')
  async removeOnePosition(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      await this.positionService.removeOnePosition(id);
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.POSITION_DELETED,
        data: {}
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }
}
