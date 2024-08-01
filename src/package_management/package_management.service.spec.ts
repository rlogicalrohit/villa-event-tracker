import { Test, TestingModule } from '@nestjs/testing';
import { PackageManagementService } from './package_management.service';

describe('PackageManagementService', () => {
  let service: PackageManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageManagementService],
    }).compile();

    service = module.get<PackageManagementService>(PackageManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
