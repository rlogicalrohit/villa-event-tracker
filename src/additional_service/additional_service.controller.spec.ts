import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalServiceController } from './additional_service.controller';
import { AdditionalServiceService } from './additional_service.service';

describe('AdditionalServiceController', () => {
  let controller: AdditionalServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdditionalServiceController],
      providers: [AdditionalServiceService],
    }).compile();

    controller = module.get<AdditionalServiceController>(AdditionalServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
