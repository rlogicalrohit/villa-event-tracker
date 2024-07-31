import { Test, TestingModule } from '@nestjs/testing';
import { EventCategoryController } from './event_category.controller';
import { EventCategoryService } from './event_category.service';

describe('EventCategoryController', () => {
  let controller: EventCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventCategoryController],
      providers: [EventCategoryService],
    }).compile();

    controller = module.get<EventCategoryController>(EventCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
