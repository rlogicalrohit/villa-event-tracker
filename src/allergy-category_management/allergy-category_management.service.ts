import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllergyCategoryManagement } from './entities/allergy-category_management.entity';
import { CreateAllergyCategoryManagementDto } from './dto/create-allergy-category_management.dto';
import { UpdateAllergyCategoryManagementDto } from './dto/update-allergy-category_management.dto';
import { MESSAGE } from 'src/common/collection';

@Injectable()
export class AllergyCategoryManagementService {
  constructor(
    @InjectRepository(AllergyCategoryManagement)
    private readonly allergyCategoryManagementRepository: Repository<AllergyCategoryManagement>,
  ) { }

  async createAllergyCategory(createAllergyCategoryManagementDto: CreateAllergyCategoryManagementDto): Promise<AllergyCategoryManagement> {
    try {
      const allergyCategory = await this.findAllergyCategoryByName(createAllergyCategoryManagementDto.name)
      if (allergyCategory) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGE.WARNING.ALLERGY_CATEGORY_ALREADY_EXISTS
        }, HttpStatus.BAD_REQUEST);
      }
      const newAllergyCategory = this.allergyCategoryManagementRepository.create(createAllergyCategoryManagementDto);
      return await this.allergyCategoryManagementRepository.save(newAllergyCategory);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllAllergyCategories(): Promise<AllergyCategoryManagement[]> {
    try {
      return await this.allergyCategoryManagementRepository.find();
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneAllergyCategory(id: string) {
    try {
      const allergyCategory = await this.allergyCategoryManagementRepository.findOne({ where: { id } });
      if (!allergyCategory) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.ALLERGY_CATEGORY_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      return allergyCategory;
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOneAllergyCategory(id: string, updateAllergyCategoryManagementDto: UpdateAllergyCategoryManagementDto) {
    try {
      const allergyCategory = await this.findOneAllergyCategory(id)
      if (!allergyCategory) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGE.WARNING.ALLERGY_CATEGORY_NOT_FOUND
        }, HttpStatus.BAD_REQUEST);
      }
      await this.allergyCategoryManagementRepository.update(id, updateAllergyCategoryManagementDto);
      return await this.allergyCategoryManagementRepository.findOne({ where: { id } });
    } catch (error) {
      console.log('error: ', error);

      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.response?.error ? error?.response?.error : error?.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeOneAllergyCategory(id: string): Promise<void> {
    try {
      const allergyCategory = await this.findOneAllergyCategory(id);
      if (!allergyCategory) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGE.WARNING.ALLERGY_CATEGORY_NOT_FOUND
        }, HttpStatus.BAD_REQUEST);
      }
      await this.allergyCategoryManagementRepository.delete(id);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllergyCategoryByName(name: string): Promise<AllergyCategoryManagement> {
    try {
      return await this.allergyCategoryManagementRepository.findOne({ where: { name } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
