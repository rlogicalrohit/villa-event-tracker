import { Module } from '@nestjs/common';
import { MenuGroupManagementService } from './menu-group_management.service';
import { MenuGroupManagementController } from './menu-group_management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuGroupManagement } from './entities/menu-group_management.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuGroupManagement])],
  controllers: [MenuGroupManagementController],
  providers: [MenuGroupManagementService],
})
export class MenuGroupManagementModule {}
