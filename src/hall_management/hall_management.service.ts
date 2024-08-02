import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HallManagement } from './entities/hall_management.entity';
import { CreateHallManagementDto } from './dto/create-hall_management.dto';
import { UpdateHallManagementDto } from './dto/update-hall_management.dto';

@Injectable()
export class HallManagementService {
  constructor(
    @InjectRepository(HallManagement)
    private readonly hallRepository: Repository<HallManagement>,
  ) { }

  createHall(createHallDto: CreateHallManagementDto): Promise<HallManagement> {
    try {
      const newHall = this.hallRepository.create(createHallDto);
      return this.hallRepository.save(newHall);
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

  findOneHall(id: string): Promise<HallManagement> {
    try {
      return this.hallRepository.findOne({ where: { id } });

    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error ? error.response.error : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateHall(id: string, updateHallDto: UpdateHallManagementDto): Promise<HallManagement> {
    try {
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
