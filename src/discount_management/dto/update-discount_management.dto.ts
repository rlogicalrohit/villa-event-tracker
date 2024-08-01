import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscountManagementDto } from './create-discount_management.dto';

export class UpdateDiscountManagementDto extends PartialType(CreateDiscountManagementDto) {}
