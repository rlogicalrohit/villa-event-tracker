import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHallManagementDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    capacity: number;

    @IsString()
    description: string;

}
