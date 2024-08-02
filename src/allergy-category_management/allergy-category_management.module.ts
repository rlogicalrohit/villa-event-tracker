import { Module } from '@nestjs/common';
import { AllergyCategoryManagementService } from './allergy-category_management.service';
import { AllergyCategoryManagementController } from './allergy-category_management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllergyCategoryManagement } from './entities/allergy-category_management.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AllergyCategoryManagement])],
  controllers: [AllergyCategoryManagementController],
  providers: [AllergyCategoryManagementService],
})
export class AllergyCategoryManagementModule { }
