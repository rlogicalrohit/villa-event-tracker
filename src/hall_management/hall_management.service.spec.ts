import { Test, TestingModule } from '@nestjs/testing';
import { HallManagementService } from './hall_management.service';

describe('HallManagementService', () => {
  let service: HallManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HallManagementService],
    }).compile();

    service = module.get<HallManagementService>(HallManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
