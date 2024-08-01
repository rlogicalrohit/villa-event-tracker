import { Module } from '@nestjs/common';
import { PackageManagementService } from './package_management.service';
import { PackageManagementController } from './package_management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageManagement } from './entities/package_management.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PackageManagement])],
  controllers: [PackageManagementController],
  providers: [PackageManagementService],
})
export class PackageManagementModule {}
