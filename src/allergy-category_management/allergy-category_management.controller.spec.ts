import { Test, TestingModule } from '@nestjs/testing';
import { AllergyCategoryManagementController } from './allergy-category_management.controller';
import { AllergyCategoryManagementService } from './allergy-category_management.service';

describe('AllergyCategoryManagementController', () => {
  let controller: AllergyCategoryManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllergyCategoryManagementController],
      providers: [AllergyCategoryManagementService],
    }).compile();

    controller = module.get<AllergyCategoryManagementController>(AllergyCategoryManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
