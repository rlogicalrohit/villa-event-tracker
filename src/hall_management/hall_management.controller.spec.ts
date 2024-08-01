import { Test, TestingModule } from '@nestjs/testing';
import { HallManagementController } from './hall_management.controller';
import { HallManagementService } from './hall_management.service';

describe('HallManagementController', () => {
  let controller: HallManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HallManagementController],
      providers: [HallManagementService],
    }).compile();

    controller = module.get<HallManagementController>(HallManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
