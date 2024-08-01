import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategory } from './entities/event_category.entity';

@Injectable()
export class EventCategoryService {
  constructor(
    @InjectRepository(EventCategory)
    private readonly eventCategoryRepository: Repository<EventCategory>,
  ) { }

  async createEventCategory(eventCategory: Partial<EventCategory>): Promise<EventCategory> {
    try {
      const newCategory = this.eventCategoryRepository.create(eventCategory);
      return await this.eventCategoryRepository.save(newCategory);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllEventCategory(): Promise<EventCategory[]> {
    try {
      return await this.eventCategoryRepository.find();
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneEventCategory(id: number): Promise<EventCategory> {
    try {
      return await this.eventCategoryRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateEventCategory(id: number, updateData: Partial<EventCategory>): Promise<EventCategory> {
    try {
      await this.eventCategoryRepository.update(id, updateData);
      return await this.eventCategoryRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeEventCategory(id: number): Promise<void> {
    try {
      await this.eventCategoryRepository.delete(id);
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findEventByName(name: string): Promise<EventCategory> {
    try {
      return await this.eventCategoryRepository.findOne({ where: { name } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

