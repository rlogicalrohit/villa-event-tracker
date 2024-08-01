import { Module } from '@nestjs/common';
import { DiscountManagementService } from './discount_management.service';
import { DiscountManagementController } from './discount_management.controller';

@Module({
  controllers: [DiscountManagementController],
  providers: [DiscountManagementService],
})
export class DiscountManagementModule {}
