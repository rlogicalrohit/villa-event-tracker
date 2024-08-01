import { Injectable } from '@nestjs/common';
import { CreateDiscountManagementDto } from './dto/create-discount_management.dto';
import { UpdateDiscountManagementDto } from './dto/update-discount_management.dto';

@Injectable()
export class DiscountManagementService {
  create(createDiscountManagementDto: CreateDiscountManagementDto) {
    return 'This action adds a new discountManagement';
  }

  findAll() {
    return `This action returns all discountManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discountManagement`;
  }

  update(id: number, updateDiscountManagementDto: UpdateDiscountManagementDto) {
    return `This action updates a #${id} discountManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} discountManagement`;
  }
}
