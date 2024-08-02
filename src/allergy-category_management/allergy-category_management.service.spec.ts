import { Test, TestingModule } from '@nestjs/testing';
import { AllergyCategoryManagementService } from './allergy-category_management.service';

describe('AllergyCategoryManagementService', () => {
  let service: AllergyCategoryManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllergyCategoryManagementService],
    }).compile();

    service = module.get<AllergyCategoryManagementService>(AllergyCategoryManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
