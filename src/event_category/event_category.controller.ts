import { Controller, Get, Post, Body, Param, Put, Delete, Res, HttpStatus, HttpException } from '@nestjs/common';
import { EventCategoryService } from './event_category.service';
import { EventCategory } from './entities/event_category.entity';
import { Response } from 'express';
import { MESSAGE } from 'src/common/collection';
import { CreateEventCategoryDto } from './dto/create-event_category.dto';

@Controller('event-category')
export class EventCategoryController {
  constructor(private readonly eventCategoryService: EventCategoryService) { }

  @Post('add')
  async createEventCategory(@Body() eventCategory: CreateEventCategoryDto, @Res() res: Response) {
    try {
      const eventCategoryDetail = await this.eventCategoryService.createEventCategory(eventCategory);
      res.status(HttpStatus.CREATED).json({
        data: { eventCategoryDetail },
        status: HttpStatus.CREATED,
        message: MESSAGE.SUCCESS.EVENT_CATEGORY_CREATED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('all')
  async findAllEventCategory(@Res() res: Response) {
    try {
      const eventCategories = await this.eventCategoryService.findAllEventCategory();
      res.status(HttpStatus.OK).json({
        data: { eventCategories },
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.EVENT_CATEGORIES_FETCHED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Get('get/:id')
  async findOneEventCategory(@Param('id') id: string, @Res() res: Response) {
    try {
      const eventCategory = await this.eventCategoryService.findOneEventCategory(id);
      res.status(HttpStatus.OK).json({
        data: { eventCategory },
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.EVENT_CATEGORIES_FETCHED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Put('update/:id')
  async updateEventCategory(
    @Param('id') id: string,
    @Body() updateData: CreateEventCategoryDto,
    @Res() res: Response) {
    try {
      const updatedEventCategory = await this.eventCategoryService.updateEventCategory(id, updateData);
      res.status(HttpStatus.OK).json({
        data: { updatedEventCategory },
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.EVENT_CATEGORY_UPDATED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }

  @Delete('delete/:id')
  async removeEventCategory(@Param('id',) id: string, @Res() res: Response) {
    try {
      await this.eventCategoryService.removeEventCategory(id);
      res.status(HttpStatus.OK).json({
        data: {},
        status: HttpStatus.OK,
        message: MESSAGE.SUCCESS.EVENT_CATEGORY_DELETED
      })
    } catch (error) {
      res.status(error.status).json({
        error: error.response.error,
        status: error.status
      })
    }
  }
}
