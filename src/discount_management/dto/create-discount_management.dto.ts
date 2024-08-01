import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateDiscountManagementDto {

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    discount_type: string;

    @IsNumber()
    @IsNotEmpty()
    discount_value: number;
}

