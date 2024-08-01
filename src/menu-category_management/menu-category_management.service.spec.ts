import { Test, TestingModule } from '@nestjs/testing';
import { MenuCategoryManagementService } from './menu-category_management.service';

describe('MenuCategoryManagementService', () => {
  let service: MenuCategoryManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuCategoryManagementService],
    }).compile();

    service = module.get<MenuCategoryManagementService>(MenuCategoryManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
