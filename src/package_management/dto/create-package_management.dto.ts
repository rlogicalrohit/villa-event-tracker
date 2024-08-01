import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePackageManagementDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}
