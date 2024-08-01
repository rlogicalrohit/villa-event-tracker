import { Module } from '@nestjs/common';
import { MenuCategoryManagementService } from './menu-category_management.service';
import { MenuCategoryManagementController } from './menu-category_management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuCategoryManagement } from './entities/menu-category_management.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuCategoryManagement])],
  controllers: [MenuCategoryManagementController],
  providers: [MenuCategoryManagementService],
})
export class MenuCategoryManagementModule { }
