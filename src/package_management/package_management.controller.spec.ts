import { Test, TestingModule } from '@nestjs/testing';
import { PackageManagementController } from './package_management.controller';
import { PackageManagementService } from './package_management.service';

describe('PackageManagementController', () => {
  let controller: PackageManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageManagementController],
      providers: [PackageManagementService],
    }).compile();

    controller = module.get<PackageManagementController>(PackageManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
