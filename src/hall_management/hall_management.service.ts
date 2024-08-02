import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HallManagement } from './entities/hall_management.entity';
import { CreateHallManagementDto } from './dto/create-hall_management.dto';
import { UpdateHallManagementDto } from './dto/update-hall_management.dto';
import { MESSAGE } from 'src/common/collection';

@Injectable()
export class HallManagementService {
  constructor(
    @InjectRepository(HallManagement)
    private readonly hallRepository: Repository<HallManagement>,
  ) { }

  async createHall(createHallDto: CreateHallManagementDto): Promise<HallManagement> {
    try {
      const hall = await this.findOneHallByname(createHallDto.name)
      if (hall) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGE.WARNING.HALL_ALREADY_EXIST
        }, HttpStatus.BAD_REQUEST);
      }
      const newHall = this.hallRepository.create(createHallDto);
      return await this.hallRepository.save(newHall);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllHall(): Promise<HallManagement[]> {
    try {
      return await this.hallRepository.find();
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneHall(id: string): Promise<HallManagement> {
    try {
      const hall = await this.hallRepository.findOne({ where: { id } });
      if (!hall) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.HALL_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      return hall;
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateHall(id: string, updateHallDto: UpdateHallManagementDto): Promise<HallManagement> {
    try {
      const hall = await this.findOneHall(id);
      if (!hall) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.HALL_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      await this.hallRepository.update(id, updateHallDto);
      return this.hallRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeHall(id: string): Promise<void> {
    try {
      const hall = await this.findOneHall(id);
      if (!hall) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.HALL_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      await this.hallRepository.delete(id);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneHallByname(name: string): Promise<HallManagement> {
    try {
      return await this.hallRepository.findOne({ where: { name } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
