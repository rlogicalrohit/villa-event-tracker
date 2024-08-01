import { Test, TestingModule } from '@nestjs/testing';
import { DiscountManagementService } from './discount_management.service';

describe('DiscountManagementService', () => {
  let service: DiscountManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountManagementService],
    }).compile();

    service = module.get<DiscountManagementService>(DiscountManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
