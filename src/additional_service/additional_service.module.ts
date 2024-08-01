import { Module } from '@nestjs/common';
import { AdditionalServiceService } from './additional_service.service';
import { AdditionalServiceController } from './additional_service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalService } from './entities/additional_service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdditionalService])],
  controllers: [AdditionalServiceController],
  providers: [AdditionalServiceService],
})
export class AdditionalServiceModule { }
