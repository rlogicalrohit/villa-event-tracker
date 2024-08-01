import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, Res, HttpException, HttpStatus } from '@nestjs/common';
import { HallManagementService } from './hall_management.service';
import { HallManagement } from './entities/hall_management.entity';
import { CreateHallManagementDto } from './dto/create-hall_management.dto';
import { UpdateHallManagementDto } from './dto/update-hall_management.dto';
import { MESSAGE } from 'src/common/collection';
import { Response } from 'express';

@Controller('hall')
export class HallManagementController {
  constructor(private readonly hallService: HallManagementService) { }

  @Post('add')
  async createHall(@Body() createHallDto: CreateHallManagementDto, @Res() res: Response) {
    try {
      const hall = await this.hallService.findOneHallByname(createHallDto.name)
      if (hall) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGE.WARNING.HALL_ALREADY_EXIST
        }, HttpStatus.BAD_REQUEST);
      }
      const hallDetail = await this.hallService.createHall(createHallDto);
      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: MESSAGE.SUCCESS.HALL_ADDED,
        data: { hallDetail }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('all')
  async findAllHall(@Res() res: Response) {
    try {
      const allHalls = await this.hallService.findAllHall();
      res.status(HttpStatus.OK).json({
        data: { allHalls },
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.ALL_HALLS_FETCHED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('get/:id')
  async findOneHall(@Param('id') id: string, @Res() res: Response) {
    try {
      const hall = await this.hallService.findOneHall(id);
      if (!hall) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.HALL_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      res.status(HttpStatus.OK).json({
        data: { hall },
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.HALL_FETCHED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Put('update/:id')
  async updateHall(
    @Param('id') id: string,
    @Body() updateHallDto: UpdateHallManagementDto,
    @Res() res: Response) {
    try {
      const hall = await this.hallService.findOneHall(id);
      if (!hall) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.HALL_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      const updatedHallDetail = await this.hallService.updateHall(id, updateHallDto);
      res.status(HttpStatus.OK).json({
        data: { updatedHallDetail },
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.HALL_UPDATED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Delete('delete/:id')
  async removeHall(@Param('id') id: string, @Res() res: Response) {
    try {
      const hall = await this.hallService.findOneHall(id);
      if (!hall) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.HALL_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      const hallDetail = await this.hallService.removeHall(id);
      res.status(HttpStatus.OK).json({
        data: { hallDetail },
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.HALL_DELETED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }
}
