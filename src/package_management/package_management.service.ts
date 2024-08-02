import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackageManagement } from './entities/package_management.entity';
import { CreatePackageManagementDto } from './dto/create-package_management.dto';
import { UpdatePackageManagementDto } from './dto/update-package_management.dto';
import { MESSAGE } from 'src/common/collection';

@Injectable()
export class PackageManagementService {
  constructor(
    @InjectRepository(PackageManagement)
    private readonly packageRepository: Repository<PackageManagement>,
  ) { }

  async createPackage(createPackageDto: CreatePackageManagementDto): Promise<PackageManagement> {
    try {
      const packageDetail = await this.findPackageByName(createPackageDto.name);
      if (packageDetail) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGE.WARNING.PACKAGE_ALREADY_EXISTS
        }, HttpStatus.BAD_REQUEST);
      }
      const newPackage = this.packageRepository.create(createPackageDto);
      return await this.packageRepository.save(newPackage);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllPackage(): Promise<PackageManagement[]> {
    try {
      return await this.packageRepository.find();
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOnePackage(id: string): Promise<PackageManagement> {
    try {
      const packageDetail = await this.packageRepository.findOne({ where: { id } });
      if (!packageDetail) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.PACKAGE_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      return packageDetail;
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updatePackage(id: string, updatePackageDto: UpdatePackageManagementDto): Promise<PackageManagement> {
    try {
      const packageDetail = await this.findOnePackage(id);
      if (!packageDetail) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.PACKAGE_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      await this.packageRepository.update(id, updatePackageDto);
      return await this.packageRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removePackage(id: string): Promise<void> {
    try {
      const iSpackageDetail = await this.findOnePackage(id);
      if (!iSpackageDetail) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.PACKAGE_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      await this.packageRepository.delete(id);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findPackageByName(name: string): Promise<PackageManagement> {
    try {
      return await this.packageRepository.findOne({ where: { name } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
