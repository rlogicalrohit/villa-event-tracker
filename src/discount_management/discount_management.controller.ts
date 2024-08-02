import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, Res, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDiscountManagementDto } from './dto/create-discount_management.dto';
import { DiscountManagementService } from './discount_management.service';
import { UpdateDiscountManagementDto } from './dto/update-discount_management.dto';
import { Response } from 'express';
import { MESSAGE } from 'src/common/collection';

@Controller('discount')
export class DiscountManagementController {
  constructor(private readonly discountManagementService: DiscountManagementService) { }

  @Post('add')
  async createDiscount(@Body() createDiscountManagementDto: CreateDiscountManagementDto, @Res() res: Response) {
    try {
      const discountDetail = await this.discountManagementService.createDiscount(createDiscountManagementDto);
      res.status(HttpStatus.CREATED).json({
        data: { discountDetail },
        status: HttpStatus.CREATED,
        message: MESSAGE.SUCCESS.DISCOUNT_CREATED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('all')
  async findAllDiscounts(@Res() res: Response) {
    try {
      const discounts = await this.discountManagementService.findAllDiscounts();
      res.status(HttpStatus.OK).json({
        data: { discounts },
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.ALL_DISCOUNTS_FETCHED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('get/:id')
  async findOneDiscount(@Param('id') id: string, @Res() res: Response) {
    try {
      const discount = await this.discountManagementService.findOneDiscount(id);
      res.status(HttpStatus.OK).json({
        data: { discount },
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.DISCOUNT_FETCHED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Put('update/:id')
  async updateOneDiscount(
    @Param('id') id: string,
    @Body() updateDiscountManagementDto: UpdateDiscountManagementDto,
    @Res() res: Response) {
    try {
      const updatedDiscountDetail = await this.discountManagementService.updateOneDiscount(id, updateDiscountManagementDto);
      res.status(HttpStatus.OK).json({
        data: { updatedDiscountDetail },
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.DISCOUNT_UPDATED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Delete('delete/:id')
  async removeOneDiscount(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.discountManagementService.removeOneDiscount(id);
      res.status(HttpStatus.OK).json({
        data: {},
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.DISCOUNT_DELETED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }
}
