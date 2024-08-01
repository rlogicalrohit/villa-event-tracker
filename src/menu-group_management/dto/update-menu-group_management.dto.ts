import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuGroupManagementDto } from './create-menu-group_management.dto';

export class UpdateMenuGroupManagementDto extends PartialType(CreateMenuGroupManagementDto) {}
