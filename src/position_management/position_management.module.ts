import { Module } from '@nestjs/common';
import { PositionManagementService } from './position_management.service';
import { PositionManagementController } from './position_management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionManagement } from './entities/position_management.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PositionManagement])],
  controllers: [PositionManagementController],
  providers: [PositionManagementService],
})
export class PositionManagementModule { }
