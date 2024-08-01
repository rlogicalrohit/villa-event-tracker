import { PartialType } from '@nestjs/mapped-types';
import { CreateHallManagementDto } from './create-hall_management.dto';

export class UpdateHallManagementDto extends PartialType(CreateHallManagementDto) {}
