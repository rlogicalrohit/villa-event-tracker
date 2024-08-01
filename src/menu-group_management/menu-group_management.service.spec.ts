import { Test, TestingModule } from '@nestjs/testing';
import { MenuGroupManagementService } from './menu-group_management.service';

describe('MenuGroupManagementService', () => {
  let service: MenuGroupManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuGroupManagementService],
    }).compile();

    service = module.get<MenuGroupManagementService>(MenuGroupManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
