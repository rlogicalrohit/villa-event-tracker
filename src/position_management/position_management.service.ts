// position-management.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PositionManagement } from './entities/position_management.entity';
import { CreatePositionManagementDto } from './dto/create-position_management.dto';
import { UpdatePositionManagementDto } from './dto/update-position_management.dto';
import { MESSAGE } from 'src/common/collection';

@Injectable()
export class PositionManagementService {
  constructor(
    @InjectRepository(PositionManagement)
    private readonly positionRepository: Repository<PositionManagement>,
  ) { }

  async createPosition(createDto: CreatePositionManagementDto): Promise<PositionManagement> {
    try {
      const position = await this.findPositionByName(createDto.name);
      if (position) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.POSITION_ALREADY_EXIST
        }, HttpStatus.NOT_FOUND);
      }
      const newPosition = this.positionRepository.create(createDto);
      return await this.positionRepository.save(newPosition);
    } catch (error) {
      throw new HttpException({
        status: error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.response?.error ? error?.response?.error : error?.message,
      }, error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllPositions(): Promise<PositionManagement[]> {
    try {
      return await this.positionRepository.find();
    } catch (error) {
      throw new HttpException({
        status: error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.response?.error ? error?.response?.error : error?.message,
      }, error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOnePosition(id: string): Promise<PositionManagement> {
    try {
      const position = await this.positionRepository.findOne({ where: { id } });
      if (!position) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.POSTION_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      return position;
    } catch (error) {
      throw new HttpException({
        status: error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.response?.error ? error?.response?.error : error?.message,
      }, error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOnePosition(id: string, updateDto: UpdatePositionManagementDto): Promise<PositionManagement> {
    try {
      const position = await this.findOnePosition(id);
      if (!position) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.POSTION_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      await this.positionRepository.update(id, updateDto);
      return await this.findOnePosition(id);
    } catch (error) {
      throw new HttpException({
        status: error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.response?.error ? error?.response?.error : error?.message,
      }, error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeOnePosition(id: string): Promise<void> {
    try {
      const position = await this.findOnePosition(id);
      if (!position) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.POSTION_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      await this.positionRepository.delete(id);
    } catch (error) {
      throw new HttpException({
        status: error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.response?.error ? error?.response?.error : error?.message,
      }, error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findPositionByName(name: string): Promise<PositionManagement> {
    try {
      return await this.positionRepository.findOne({ where: { name } });
    } catch (error) {
      throw new HttpException({
        status: error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.response?.error ? error?.response?.error : error?.message,
      }, error?.status ? error?.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
