import { PartialType } from '@nestjs/mapped-types';
import { CreatePositionManagementDto } from './create-position_management.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePositionManagementDto extends PartialType(CreatePositionManagementDto) {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;
}
