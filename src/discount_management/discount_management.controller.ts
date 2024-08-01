import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountManagementService } from './discount_management.service';
import { CreateDiscountManagementDto } from './dto/create-discount_management.dto';
import { UpdateDiscountManagementDto } from './dto/update-discount_management.dto';

@Controller('discount-management')
export class DiscountManagementController {
  constructor(private readonly discountManagementService: DiscountManagementService) {}

  @Post()
  create(@Body() createDiscountManagementDto: CreateDiscountManagementDto) {
    return this.discountManagementService.create(createDiscountManagementDto);
  }

  @Get()
  findAll() {
    return this.discountManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountManagementDto: UpdateDiscountManagementDto) {
    return this.discountManagementService.update(+id, updateDiscountManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountManagementService.remove(+id);
  }
}
