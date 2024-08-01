import { Test, TestingModule } from '@nestjs/testing';
import { DiscountManagementController } from './discount_management.controller';
import { DiscountManagementService } from './discount_management.service';

describe('DiscountManagementController', () => {
  let controller: DiscountManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountManagementController],
      providers: [DiscountManagementService],
    }).compile();

    controller = module.get<DiscountManagementController>(DiscountManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
