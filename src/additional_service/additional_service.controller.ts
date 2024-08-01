import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AdditionalServiceService } from './additional_service.service';
import { CreateAdditionalServiceDto } from './dto/create-additional_service.dto';
import { UpdateAdditionalServiceDto } from './dto/update-additional_service.dto';
import { Response } from 'express';
import { MESSAGE } from 'src/common/collection';

@Controller('additional-service')
export class AdditionalServiceController {
  constructor(private readonly additionalServiceService: AdditionalServiceService) { }

  @Post('add')
  async createAdditionalService(@Body() createAdditionalServiceDto: CreateAdditionalServiceDto, @Res() res: Response) {
    try {
      const serviceExists = await this.additionalServiceService.findAdditionalServiceByName(createAdditionalServiceDto.name);
      if (serviceExists) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGE.WARNING.ADDITIONAL_SERVICE_EXISTS
        }, HttpStatus.BAD_REQUEST);
      }
      const additionalService = await this.additionalServiceService.createAdditionalService(createAdditionalServiceDto);
      res.status(HttpStatus.CREATED).json({
        data: { additionalService }, status: HttpStatus.CREATED, message: MESSAGE.SUCCESS.ADDITIONAL_SERVICE_ADDED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('all')
  async findAllAdditionalService(@Res() res: Response) {
    try {
      const additionalServices = await this.additionalServiceService.findAllAdditionalService();
      res.status(HttpStatus.OK).json({
        data: { additionalServices }, status: HttpStatus.OK, message: MESSAGE.SUCCESS.ADDITIONAL_SERVICES_FETCHED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('get/:id')
  async findOneAdditionalService(@Param('id') id: string, @Res() res: Response) {
    try {
      const additionalService = await this.additionalServiceService.findOneAdditionalService(id);
      if (!additionalService) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.ADDITIONAL_SERVICE_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      res.status(HttpStatus.OK).json({
        data: { additionalService }, status: HttpStatus.OK, message: MESSAGE.SUCCESS.ADDITIONAL_SERVICE_FETCHED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Put('update/:id')
  async updateOneAdditionalService(
    @Param('id') id: string,
    @Body() updateAdditionalServiceDto: UpdateAdditionalServiceDto,
    @Res() res: Response) {
    try {
      const additionalService = await this.additionalServiceService.findOneAdditionalService(id);
      if (!additionalService) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.ADDITIONAL_SERVICE_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      const updatedAdditionalService = await this.additionalServiceService.updateOneAdditionalService(id, updateAdditionalServiceDto);
      res.status(HttpStatus.OK).json({
        data: { updatedAdditionalService }, status: HttpStatus.OK, message: MESSAGE.SUCCESS.ADDITIONAL_SERVICE_UPDATED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Delete('delete/:id')
  async removeOneAdditionalService(@Param('id') id: string, @Res() res: Response) {
    try {
      const additionalService = await this.additionalServiceService.findOneAdditionalService(id);
      if (!additionalService) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.ADDITIONAL_SERVICE_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      await this.additionalServiceService.removeOneAdditionalService(id);
      res.status(HttpStatus.OK).json({
        data: {}, status: HttpStatus.OK, message: MESSAGE.SUCCESS.ADDITIONAL_SERVICE_DELETED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }
}