import { Test, TestingModule } from '@nestjs/testing';
import { PositionManagementController } from './position_management.controller';
import { PositionManagementService } from './position_management.service';

describe('PositionManagementController', () => {
  let controller: PositionManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PositionManagementController],
      providers: [PositionManagementService],
    }).compile();

    controller = module.get<PositionManagementController>(PositionManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
