import { Module } from '@nestjs/common';
import { HallManagementService } from './hall_management.service';
import { HallManagementController } from './hall_management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HallManagement } from './entities/hall_management.entity';

@Module({
  imports:[TypeOrmModule.forFeature([HallManagement])],
  controllers: [HallManagementController],
  providers: [HallManagementService],
})
export class HallManagementModule {}
