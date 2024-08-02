import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiscountManagementDto } from './dto/create-discount_management.dto';
import { DiscountManagement } from './entities/discount_management.entity';
import { UpdateDiscountManagementDto } from './dto/update-discount_management.dto';

@Injectable()
export class DiscountManagementService {
  constructor(
    @InjectRepository(DiscountManagement)
    private readonly discountManagementRepository: Repository<DiscountManagement>,
  ) { }

  async createDiscount(createDiscountManagementDto: CreateDiscountManagementDto): Promise<DiscountManagement> {
    try {
      const newDiscount = this.discountManagementRepository.create(createDiscountManagementDto);
      return await this.discountManagementRepository.save(newDiscount);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllDiscounts(): Promise<DiscountManagement[]> {
    try {
      return await this.discountManagementRepository.find();
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneDiscount(id: string): Promise<DiscountManagement> {
    try {
      return await this.discountManagementRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOneDiscount(id: string, updateDiscountManagementDto: UpdateDiscountManagementDto): Promise<DiscountManagement> {
    try {
      await this.discountManagementRepository.update(id, updateDiscountManagementDto);
      return await this.discountManagementRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeOneDiscount(id: string): Promise<void> {
    try {
      await this.discountManagementRepository.delete(id);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findDiscountByCode(code: string): Promise<DiscountManagement> {
    try {
      return await this.discountManagementRepository.findOne({ where: { code } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
