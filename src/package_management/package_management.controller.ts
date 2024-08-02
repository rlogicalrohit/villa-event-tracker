import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, Res, HttpException, HttpStatus } from '@nestjs/common';
import { PackageManagementService } from './package_management.service';
import { CreatePackageManagementDto } from './dto/create-package_management.dto';
import { UpdatePackageManagementDto } from './dto/update-package_management.dto';
import { Response } from 'express';
import { MESSAGE } from 'src/common/collection';

@Controller('package')
export class PackageManagementController {
  constructor(private readonly packageService: PackageManagementService) { }

  @Post('add')
  async createPackage(@Body() createPackageDto: CreatePackageManagementDto, @Res() res: Response) {
    try {
      const packageData = await this.packageService.createPackage(createPackageDto);
      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: MESSAGE.SUCCESS.PACKAGE_ADDED,
        data: { packageData }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('all')
  async findAllPackages(@Res() res: Response) {
    try {
      const allPackages = await this.packageService.findAllPackage();
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.PACKAGES_FETCHED,
        data: { allPackages }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('get/:id')
  async findOnePackage(@Param('id') id: string, @Res() res: Response) {
    try {
      const packageDetail = await this.packageService.findOnePackage(id);
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.PACKAGE_FETCHED,
        data: { packageDetail }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Put('update/:id')
  async updateOnePackage(
    @Param('id') id: string,
    @Body() updatePackageDto: UpdatePackageManagementDto,
    @Res() res: Response) {
    try {
      const updatedPackageDetail = await this.packageService.updatePackage(id, updatePackageDto);
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.PACKAGE_UPDATED,
        data: { updatedPackageDetail }
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Delete('delete/:id')
  async removeOnePackage(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      await this.packageService.removePackage(id);
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS.PACKAGE_DELETED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }
}
