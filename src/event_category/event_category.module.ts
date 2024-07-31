import { Module } from '@nestjs/common';
import { EventCategoryService } from './event_category.service';
import { EventCategoryController } from './event_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategory } from './entities/event_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventCategory])],
  controllers: [EventCategoryController],
  providers: [EventCategoryService],
})
export class EventCategoryModule { }
