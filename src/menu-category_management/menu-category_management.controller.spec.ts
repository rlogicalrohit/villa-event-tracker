import { Test, TestingModule } from '@nestjs/testing';
import { MenuCategoryManagementController } from './menu-category_management.controller';
import { MenuCategoryManagementService } from './menu-category_management.service';

describe('MenuCategoryManagementController', () => {
  let controller: MenuCategoryManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuCategoryManagementController],
      providers: [MenuCategoryManagementService],
    }).compile();

    controller = module.get<MenuCategoryManagementController>(MenuCategoryManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
