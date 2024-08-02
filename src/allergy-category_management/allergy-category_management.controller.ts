import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, Res, HttpStatus } from '@nestjs/common';
import { AllergyCategoryManagementService } from './allergy-category_management.service';
import { CreateAllergyCategoryManagementDto } from './dto/create-allergy-category_management.dto';
import { AllergyCategoryManagement } from './entities/allergy-category_management.entity';
import { UpdateAllergyCategoryManagementDto } from './dto/update-allergy-category_management.dto';
import { Response } from 'express';
import { MESSAGE } from 'src/common/collection';

@Controller('allergy-category')
export class AllergyCategoryManagementController {
  constructor(private readonly allergyCategoryManagementService: AllergyCategoryManagementService) { }

  @Post('add')
  @UsePipes(new ValidationPipe())
  async createAllergyCategory(@Body() createAllergyCategoryManagementDto: CreateAllergyCategoryManagementDto, @Res() res: Response) {
    try {
      const allergyCategory = await this.allergyCategoryManagementService.createAllergyCategory(createAllergyCategoryManagementDto);
      res.status(HttpStatus.CREATED).json({
        data: { allergyCategory },
        status: HttpStatus.CREATED,
        message: MESSAGE.SUCCESS.ALLERGY_CATEGORY_CREATED
      });
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('all')
  async findAllAllergyCategories(@Res() res: Response) {
    try {
      const allergyCategories = await this.allergyCategoryManagementService.findAllAllergyCategories();
      res.status(HttpStatus.OK).json({
        data: { allergyCategories },
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.ALLERGY_CATEGORIES_FETCHED
      });
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('get/:id')
  async findOneAllergyCategory(@Param('id') id: string, @Res() res: Response) {
    try {
      const allergyCategory = await this.allergyCategoryManagementService.findOneAllergyCategory(id);
      res.status(HttpStatus.OK).json({
        data: { allergyCategory },
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.ALLERGY_CATEGORY_FETCHED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  async updateOneAllergyCategory(
    @Param('id') id: string,
    @Body() updateAllergyCategoryManagementDto: UpdateAllergyCategoryManagementDto,
    @Res() res: Response) {
    try {
      const updatedAllergyCategory = await this.allergyCategoryManagementService.updateOneAllergyCategory(id, updateAllergyCategoryManagementDto);
      res.status(HttpStatus.OK).json({
        data: { updatedAllergyCategory },
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.ALLERGY_CATEGORY_UPDATED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Delete('delete/:id')
  async removeOneAllergyCategory(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.allergyCategoryManagementService.removeOneAllergyCategory(id);
      res.status(HttpStatus.OK).json({
        data: {},
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.ALLERGY_CATEGORY_DELETED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }
}
