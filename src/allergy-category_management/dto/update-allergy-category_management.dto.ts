import { PartialType } from '@nestjs/mapped-types';
import { CreateAllergyCategoryManagementDto } from './create-allergy-category_management.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAllergyCategoryManagementDto extends PartialType(CreateAllergyCategoryManagementDto) {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
}
