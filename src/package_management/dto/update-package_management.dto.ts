import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageManagementDto } from './create-package_management.dto';

export class UpdatePackageManagementDto extends PartialType(CreatePackageManagementDto) {}
