import { Module } from '@nestjs/common';
import { DiscountManagementService } from './discount_management.service';
import { DiscountManagementController } from './discount_management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountManagement } from './entities/discount_management.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountManagement])],
  controllers: [DiscountManagementController],
  providers: [DiscountManagementService],
})
export class DiscountManagementModule { }
