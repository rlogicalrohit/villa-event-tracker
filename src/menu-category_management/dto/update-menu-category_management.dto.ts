import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuCategoryManagementDto } from './create-menu-category_management.dto';

export class UpdateMenuCategoryManagementDto extends PartialType(CreateMenuCategoryManagementDto) {}
