import { IsNotEmpty, IsString } from "class-validator";

export class CreateAllergyCategoryManagementDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
