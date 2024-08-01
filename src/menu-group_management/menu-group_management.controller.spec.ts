import { Test, TestingModule } from '@nestjs/testing';
import { MenuGroupManagementController } from './menu-group_management.controller';
import { MenuGroupManagementService } from './menu-group_management.service';

describe('MenuGroupManagementController', () => {
  let controller: MenuGroupManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuGroupManagementController],
      providers: [MenuGroupManagementService],
    }).compile();

    controller = module.get<MenuGroupManagementController>(MenuGroupManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
