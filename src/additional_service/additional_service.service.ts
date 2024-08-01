import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdditionalService } from './entities/additional_service.entity';
import { CreateAdditionalServiceDto } from './dto/create-additional_service.dto';
import { UpdateAdditionalServiceDto } from './dto/update-additional_service.dto';

@Injectable()
export class AdditionalServiceService {
  constructor(
    @InjectRepository(AdditionalService)
    private readonly additionalServiceRepository: Repository<AdditionalService>,
  ) { }

  async createAdditionalService(createAdditionalServiceDto: CreateAdditionalServiceDto): Promise<AdditionalService> {
    try {
      const newService = this.additionalServiceRepository.create(createAdditionalServiceDto);
      return await this.additionalServiceRepository.save(newService);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllAdditionalService(): Promise<AdditionalService[]> {
    try {
      return await this.additionalServiceRepository.find();
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneAdditionalService(id: string): Promise<AdditionalService> {
    try {
      return await this.additionalServiceRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOneAdditionalService(id: string, updateAdditionalServiceDto: UpdateAdditionalServiceDto): Promise<AdditionalService> {
    try {
      await this.additionalServiceRepository.update(id, updateAdditionalServiceDto);
      return await this.additionalServiceRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeOneAdditionalService(id: string): Promise<void> {
    try {
      await this.additionalServiceRepository.delete(id);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAdditionalServiceByName(name: string): Promise<AdditionalService> {
    try {
      return await this.additionalServiceRepository.findOne({ where: { name } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
