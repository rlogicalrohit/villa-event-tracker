import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAdditionalServiceDto {

    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNumber()
    @IsNotEmpty()
    price: number;
  
    @IsString()
    @IsNotEmpty()
    description: string;
}


