import { Test, TestingModule } from '@nestjs/testing';
import { PositionManagementService } from './position_management.service';

describe('PositionManagementService', () => {
  let service: PositionManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PositionManagementService],
    }).compile();

    service = module.get<PositionManagementService>(PositionManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
