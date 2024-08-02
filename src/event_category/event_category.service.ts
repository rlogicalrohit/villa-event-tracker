import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategory } from './entities/event_category.entity';
import { MESSAGE } from 'src/common/collection';

@Injectable()
export class EventCategoryService {
  constructor(
    @InjectRepository(EventCategory)
    private readonly eventCategoryRepository: Repository<EventCategory>,
  ) { }

  async createEventCategory(eventCategory: Partial<EventCategory>): Promise<EventCategory> {
    try {
      const eventCategoryExist = await this.findEventByName(eventCategory.name);
      if (eventCategoryExist) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGE.WARNING.EVENT_CATEGORY_EXIST
        }, HttpStatus.BAD_REQUEST);
      }
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

  async findOneEventCategory(id: string): Promise<EventCategory> {
    try {
      const eventCategory = await this.eventCategoryRepository.findOne({ where: { id } });
      if (!eventCategory) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.EVENT_CATEGORY_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      return eventCategory;
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateEventCategory(id: string, updateData: Partial<EventCategory>): Promise<EventCategory> {
    try {
      const eventCategory = await this.findOneEventCategory(id);
      if (!eventCategory) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.EVENT_CATEGORY_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
      await this.eventCategoryRepository.update(id, updateData);
      return await this.eventCategoryRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.message,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeEventCategory(id: string): Promise<void> {
    try {
      const eventCategory = await this.findOneEventCategory(id);
      if (!eventCategory) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: MESSAGE.WARNING.EVENT_CATEGORY_NOT_FOUND
        }, HttpStatus.NOT_FOUND);
      }
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

